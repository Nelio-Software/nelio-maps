/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import image from './default.png';

export default {
	image,
	value: 'default' as const,
	label: _x( 'Default', 'text', 'nelio-maps' ),
	json: '',
};
