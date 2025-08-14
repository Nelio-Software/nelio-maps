init();

function init() {
	[
		...document.querySelectorAll< HTMLElement >(
			'.nelio-maps-google-map-wrapper:not( .nelio-maps-ready )'
		),
	].map( ( el ) => initGoogleMap( el ) );
} //end init()

// HELPERS

function initGoogleMap( el: HTMLElement ) {
	if ( ! hasGoogleMaps( window ) ) {
		return;
	} //end if

	el.classList.add( 'nelio-maps-ready' );

	const options = extractMapOptions( el );
	if ( ! options ) {
		return;
	} //end if

	const map = new window.google.maps.Map( el, options );

	const marker = extractMarkerPositionIfAny( el );
	if ( marker ) {
		new window.google.maps.Marker( {
			map,
			clickable: false,
			position: new window.google.maps.LatLng( marker.lat, marker.lng ),
		} );
	} //end if
} //end initGoogleMap()

function extractMapOptions( el: HTMLElement ) {
	if ( ! hasGoogleMaps( window ) ) {
		return;
	} //end if

	const lat = parseFloat( el.getAttribute( 'data-lat' ) || '' );
	const lng = parseFloat( el.getAttribute( 'data-lng' ) || '' );

	const isDraggable = 'true' === el.getAttribute( 'data-is-draggable' );
	const showZoomButtons =
		'true' === el.getAttribute( 'data-show-zoom-buttons' );
	const showMapTypeButton =
		'true' === el.getAttribute( 'data-show-map-type-button' );
	const showFullscreenButton =
		'true' === el.getAttribute( 'data-show-fullscreen-button' );

	let styles: unknown = [];
	try {
		styles = JSON.parse( el.getAttribute( 'data-styles' ) || '' );
	} catch ( _ ) {}

	return {
		center: new window.google.maps.LatLng( lat, lng ),
		draggableCursor: ! isDraggable ? 'default' : undefined,
		fullscreenControl: showFullscreenButton,
		gestureHandling: isDraggable ? 'cooperative' : 'none',
		mapTypeControl: showMapTypeButton,
		streetViewControl: false,
		styles,
		zoom: parseInt( el.getAttribute( 'data-zoom' ) || '', 10 ),
		zoomControl: showZoomButtons,
	};
} //end extractMapOptions()

function extractMarkerPositionIfAny( el: HTMLElement ) {
	const marker = el.querySelector( '.marker' );
	if ( ! marker ) {
		return false;
	} //end if

	const lat = marker.getAttribute( 'data-lat' ) || false;
	const lng = marker.getAttribute( 'data-lng' ) || false;
	if ( ! lat || ! lng ) {
		return false;
	} //end if

	return { lat, lng };
} //end extractMarkerPositionIfAny()

function hasGoogleMaps< T >( win: T ): win is T & {
	readonly google: {
		readonly maps: {
			readonly LatLng: new ( lat: unknown, lng: unknown ) => void;
			readonly Marker: new ( opts: unknown ) => void;
			readonly Map: new ( el: HTMLElement, opts: unknown ) => void;
		};
	};
} {
	return (
		!! win &&
		'object' === typeof win &&
		'google' in win &&
		!! win.google &&
		'object' === typeof win.google &&
		'maps' in win.google &&
		!! win.google.maps &&
		'object' === typeof win.google.maps
	);
} //end hasGoogleMaps()
