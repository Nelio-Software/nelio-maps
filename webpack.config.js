/**
 * External dependencies
 */
const _ = require( 'lodash' );
const fs = require( 'fs' );
const path = require( 'path' );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ).default
	? require( 'mini-css-extract-plugin' ).default
	: require( 'mini-css-extract-plugin' );

/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// ======
// CONFIG
// ======

const blocks = _.omitBy(
	fs.readdirSync( path.resolve( process.cwd(), 'assets/src/blocks' ) ).reduce(
		( e, block ) => ( {
			...e,
			[ `blocks/${ block }` ]: getBlockFile( block, 'index.ts' ),
			[ `blocks/${ block }/view` ]: getBlockFile( block, 'view.ts' ),
		} ),
		{}
	),
	( f ) => ! f.length
);

const config = {
	...defaultConfig,
	plugins: [
		new ForkTsCheckerWebpackPlugin( {
			typescript: {
				memoryLimit: 8192,
			},
		} ),
		...removePlugins( defaultConfig.plugins, [
			'MiniCssExtractPlugin',
			'RtlCssPlugin',
		] ),
		new MiniCssExtractPlugin( {
			filename: renameStyles,
		} ),
		new CopyWebpackPlugin( {
			patterns: [
				{
					from: 'assets/src/blocks/*/block.json',
					to: ( { absoluteFilename: af } ) =>
						'blocks/' +
						_.reverse( af.split( '/' ) )[ 1 ] +
						'/block.json',
				},
			],
		} ),
	].filter( /* if plugin exists */ ( x ) => !! x ),
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(png|jpe?g|gif)$/,
				issuer: /\.tsx?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
							publicPath: '../',
						},
						loader: 'base64-inline-loader',
					},
				],
			},
		],
	},
	watchOptions: {
		ignored: /node_modules|^((?!(assets.src)).)*$/,
	},
};

module.exports = [
	{
		...config,
		entry: blocks,
		output: {
			filename: renameScripts,
			path: path.resolve( __dirname, './assets/dist/' ),
		},
	},
];

// =======
// HELPERS
// =======

function removePlugins( plugins, pluginsToRemove ) {
	return plugins.filter(
		( p ) => ! pluginsToRemove.includes( p.constructor.name )
	);
} //end removePlugins()

function renameScripts( pathData ) {
	const { name } = pathData.chunk;
	if ( ! name.includes( 'blocks/' ) ) {
		return '[name].js';
	} //end if

	return /blocks\/[a-z-]+\/view/.test( name )
		? `${ name.replace( '/view', '' ) }/view.js`
		: '[name]/index.js';
} //end renameScripts()

function renameStyles( pathData ) {
	const { name } = pathData.chunk;
	if ( name.includes( 'classic-blocks' ) ) {
		return name.includes( 'style-' )
			? `${ name.replace( 'style-', '' ) }.css`
			: `${ name.replace( 'style-', '' ) }-editor.css`;
	} //end if

	if ( ! name.includes( 'blocks/' ) ) {
		return `${ name.replace( 'style-', '' ) }.css`;
	} //end if

	return name.includes( 'style-' )
		? `${ name.replace( 'style-', '' ) }/style-index.css`
		: '[name]/index.css';
} //end renameStyles()

function getBlockFile( block, file ) {
	file = path.resolve(
		process.cwd(),
		`assets/src/blocks/${ block }/${ file }`
	);
	file = fs.existsSync( file ) ? file : `${ file }x`;
	return fs.statSync( file, { throwIfNoEntry: false } ) ? file : '';
}
