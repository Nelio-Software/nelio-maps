const { LatLng, Marker, Map } = window.google.maps;

function init() {
	[
		...document.querySelectorAll< HTMLElement >(
			'.nelio-maps-google-map-wrapper:not( .nelio-maps-ready )'
		),
	].map( ( el ) => initGoogleMap( el ) );
} //end init()

function initGoogleMap( el: HTMLElement ) {
	el.classList.add( 'nelio-maps-ready' );

	const marker = extractMarkerPositionIfAny( el );
	const map = new Map( el, extractMapOptions( el ) );

	if ( marker ) {
		new Marker( {
			map,
			clickable: false,
			position: new LatLng( marker.lat, marker.lng ),
		} );
	} //end if
} //end initGoogleMap()

function extractMapOptions( el: HTMLElement ) {
	const lat = parseFloat( el.getAttribute( 'data-lat' ) || '' );
	const lng = parseFloat( el.getAttribute( 'data-lng' ) || '' );

	const isDraggable = 'true' === el.getAttribute( 'data-is-draggable' );
	const showZoomButtons =
		'true' === el.getAttribute( 'data-show-zoom-buttons' );
	const showMapTypeButton =
		'true' === el.getAttribute( 'data-show-map-type-button' );
	const showFullscreenButton =
		'true' === el.getAttribute( 'data-show-fullscreen-button' );

	let styles = '';
	try {
		styles = JSON.parse( el.getAttribute( 'data-styles' ) || '' );
	} catch ( e ) {}

	return {
		center: new LatLng( lat, lng ),
		draggableCursor: ! isDraggable ? 'default' : undefined,
		fullscreenControl: showFullscreenButton,
		gestureHandling: isDraggable ? 'cooperative' : 'none',
		mapTypeControl: showMapTypeButton,
		streetViewControl: false,
		styles: styles,
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

init();
