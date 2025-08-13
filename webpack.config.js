/**
 * External dependencies
 */
const path = require( 'path' );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );

/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// ========
// SETTINGS
// ========
const config = {
	...defaultConfig,
	plugins: [
		new ForkTsCheckerWebpackPlugin( {
			typescript: {
				memoryLimit: 8192,
			},
		} ),
		...defaultConfig.plugins.filter(
			( p ) => 'RtlCssPlugin' !== p.constructor.name
		),
	].filter( /* if plugin exists */ ( x ) => !! x ),
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			// {
			// 	test: /\.tsx?$/,
			// 	loader: 'ts-loader',
			// 	exclude: /node_modules/,
			// },
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
		ignored: /node_modules|^((?!(packages|assets.src)).)*$/,
	},
};

module.exports = [
	{
		...config,
		entry: {
			blocks: './packages/blocks/index.ts',
			public: './assets/src/js/public/public.ts',
		},
		output: {
			path: path.resolve( __dirname, './assets/dist/' ),
		},
	},
];
