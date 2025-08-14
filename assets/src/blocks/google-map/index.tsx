/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import './style.scss';

import ElementIcon from './icon.svg';
import { GoogleMapEdit } from './edit';
import { GoogleMapSave } from './save';

// @ts-expect-error I don’t know how to properly set metadata’s type
registerBlockType( metadata, {
	icon: <ElementIcon />,
	edit: GoogleMapEdit,
	save: GoogleMapSave,
	getEditWrapperProps: ( { blockAlignment } ) =>
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		blockAlignment ? { 'data-align': blockAlignment } : null,
} );
