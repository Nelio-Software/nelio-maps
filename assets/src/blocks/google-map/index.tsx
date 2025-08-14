/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';

/* =================================================================== */
/* =================================================================== */
const BLOCK_NAME = 'nelio-maps/google-map';
const BLOCK_TITLE = _x( 'Google Map', 'text', 'nelio-maps' );
const BLOCK_DESCRIPTION = _x(
	'Add and customize a beautiful Google Map with an optional marker.',
	'user',
	'nelio-maps'
);
/* =================================================================== */
/* =================================================================== */

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

import ElementIcon from './icon.svg';
import { GoogleMapEdit } from './edit';
import { GoogleMapSave } from './save';
import attributes from './attributes';

export const name = BLOCK_NAME;
export const settings = {
	title: BLOCK_TITLE,
	description: BLOCK_DESCRIPTION,
	icon: <ElementIcon />,
	category: 'extra',
	keywords: [
		_x( 'Location', 'text', 'nelio-maps' ),
		_x( 'Geolocalization', 'text', 'nelio-maps' ),
	],

	supports: {
		html: false,
		className: false,
	},

	getEditWrapperProps: ( { blockAlignment }: { blockAlignment: string } ) =>
		blockAlignment ? { 'data-align': blockAlignment } : null,

	attributes,
	edit: GoogleMapEdit,
	save: GoogleMapSave,
};
