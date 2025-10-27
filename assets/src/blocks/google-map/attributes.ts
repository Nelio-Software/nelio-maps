const attributes = {
	// Map options.
	isDraggable: {
		type: 'boolean',
		default: false,
	},

	blockAlignment: {
		type: 'string',
		default: 'full',
	},

	height: {
		type: 'number',
		default: 30,
	},

	// Map Location.
	lat: {
		type: 'string',
		source: 'attribute',
		selector: '.nelio-maps-google-map-wrapper',
		attribute: 'data-lat',
		default: '41.3947688',
	},

	lng: {
		type: 'string',
		source: 'attribute',
		selector: '.nelio-maps-google-map-wrapper',
		attribute: 'data-lng',
		default: '2.0787284',
	},

	zoom: {
		type: 'number',
		default: 8,
	},

	// Map styling.
	style: {
		type: 'string',
		default: 'default',
	},

	customStyle: {
		type: 'string',
		source: 'attribute',
		selector: '.nelio-maps-google-map-wrapper',
		attribute: 'data-styles',
		default: '',
	},

	// Butons.
	areZoomButtonsVisible: {
		type: 'boolean',
		default: false,
	},

	isMapTypeButtonVisible: {
		type: 'boolean',
		default: false,
	},

	isFullScreenButtonVisible: {
		type: 'boolean',
		default: false,
	},

	// Marker.
	isMarkerVisible: {
		type: 'boolean',
		default: false,
	},

	marker: {
		type: 'object',
		default: {
			lat: '41.3947688',
			lng: '2.0787284',
		},
	},

	address: {
		type: 'string',
		source: 'html',
		selector: '.address',
		default: '',
	},

	addressAlignment: {
		type: 'string',
		default: 'right',
	},
};

export default attributes;
