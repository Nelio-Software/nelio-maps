/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import image from './custom.png';

export default {
	image,
	value: 'custom' as const,
	label: _x( 'Custom', 'text', 'nelio-maps' ),
	json: '',
};
