/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import image from './dark.png';

export default {
	image,
	value: 'dark' as const,
	label: _x( 'Dark', 'text', 'nelio-maps' ),

	/* eslint-disable-next-line */
	json: [
		{
			featureType: 'all',
			elementType: 'labels.text.fill',
			stylers: [
				{ saturation: 36 },
				{ color: '#000000' },
				{ lightness: 40 },
			],
		},
		{
			featureType: 'all',
			elementType: 'labels.text.stroke',
			stylers: [
				{ visibility: 'on' },
				{ color: '#000000' },
				{ lightness: 16 },
			],
		},
		{
			featureType: 'all',
			elementType: 'labels.icon',
			stylers: [ { visibility: 'off' } ],
		},
		{
			featureType: 'administrative',
			elementType: 'geometry.fill',
			stylers: [ { color: '#000000' }, { lightness: 20 } ],
		},
		{
			featureType: 'administrative',
			elementType: 'geometry.stroke',
			stylers: [
				{ color: '#000000' },
				{ lightness: 17 },
				{ weight: 1.2 },
			],
		},
		{
			featureType: 'landscape',
			elementType: 'all',
			stylers: [ { visibility: 'on' } ],
		},
		{
			featureType: 'landscape',
			elementType: 'geometry',
			stylers: [ { color: '#000000' }, { lightness: 20 } ],
		},
		{
			featureType: 'landscape',
			elementType: 'labels.icon',
			stylers: [ { saturation: '-100' }, { lightness: '-54' } ],
		},
		{
			featureType: 'poi',
			elementType: 'all',
			stylers: [ { visibility: 'on' }, { lightness: '0' } ],
		},
		{
			featureType: 'poi',
			elementType: 'geometry',
			stylers: [ { color: '#000000' }, { lightness: 21 } ],
		},
		{
			featureType: 'poi',
			elementType: 'labels.icon',
			stylers: [ { saturation: '-89' }, { lightness: '-55' } ],
		},
		{
			featureType: 'road',
			elementType: 'labels.icon',
			stylers: [ { visibility: 'off' } ],
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.fill',
			stylers: [ { color: '#000000' }, { lightness: 17 } ],
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.stroke',
			stylers: [
				{ color: '#000000' },
				{ lightness: 29 },
				{ weight: 0.2 },
			],
		},
		{
			featureType: 'road.arterial',
			elementType: 'geometry',
			stylers: [ { color: '#000000' }, { lightness: 18 } ],
		},
		{
			featureType: 'road.local',
			elementType: 'geometry',
			stylers: [ { color: '#000000' }, { lightness: 16 } ],
		},
		{
			featureType: 'transit',
			elementType: 'geometry',
			stylers: [ { color: '#000000' }, { lightness: 19 } ],
		},
		{
			featureType: 'transit.station',
			elementType: 'labels.icon',
			stylers: [
				{ visibility: 'on' },
				{ saturation: '-100' },
				{ lightness: '-51' },
			],
		},
		{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [ { color: '#000000' }, { lightness: 17 } ],
		},
	],
};
