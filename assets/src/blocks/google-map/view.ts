domReady( () => {
	[
		...document.querySelectorAll< HTMLElement >(
			'.nelio-maps-google-map-wrapper:not( .nelio-maps-ready )'
		),
	].map( initGoogleMap );
} );

// =======
// HELPERS
// =======

function domReady( callback: () => unknown ) {
	if ( typeof document === 'undefined' ) {
		return;
	} //end if

	if (
		document.readyState === 'complete' || // DOMContentLoaded + Images/Styles/etc loaded, so we call directly.
		document.readyState === 'interactive' // DOMContentLoaded fires at this point, so we call directly.
	) {
		return void callback();
	} //end if

	// DOMContentLoaded has not fired yet, delay callback until then.
	document.addEventListener( 'DOMContentLoaded', callback );
} //end domReady()

function initGoogleMap( el: HTMLElement ) {
	if ( ! hasGoogleMaps( window ) ) {
		return;
	} //end if

	el.classList.add( 'nelio-maps-ready' );

	const options = extractMapOptions( el );
	if ( ! options ) {
		return;
	} //end if

	const marker = extractMarkerPositionIfAny( el );
	const map = new window.google.maps.Map( el, options );
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
		clickableIcons: isDraggable,
		draggableCursor: ! isDraggable ? 'default' : undefined,
		disableDefaultUI: true,
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
