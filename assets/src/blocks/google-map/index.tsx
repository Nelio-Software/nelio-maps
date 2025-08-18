/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import './style.scss';

import { GoogleMapEdit } from './edit';
import { GoogleMapSave } from './save';

// @ts-expect-error I don’t know how to properly set metadata’s type
registerBlockType( metadata, {
	edit: GoogleMapEdit,
	save: GoogleMapSave,
	getEditWrapperProps: ( { blockAlignment } ) =>
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		blockAlignment ? { 'data-align': blockAlignment } : null,
} );
