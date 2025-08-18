/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';

/**
 * External dependencies
 */
import { GoogleMap } from '@react-google-maps/api';

export type MapBlockProps = {
	readonly zoom: number;
	readonly height: string;
	readonly center: { readonly lat: number; readonly lng: number };
	readonly options: Record< string, any >;
	readonly onZoomChanged: ( zoom: number ) => void;
	readonly onCenterChanged: ( lat: string, lng: string ) => void;
	readonly children: JSX.Element | ReadonlyArray< JSX.Element >;
};

export const MapBlock = ( {
	zoom,
	height,
	center,
	children,
	options,
	onZoomChanged,
	onCenterChanged,
}: MapBlockProps ): JSX.Element => {
	const mapRef = useRef< google.maps.Map | null >( null );
	return (
		<GoogleMap
			onLoad={ ( ref ) => {
				mapRef.current = ref;
			} }
			mapContainerClassName="nelio-maps-google-map-wrap"
			mapContainerStyle={ { height } }
			zoom={ zoom }
			center={ center }
			options={ options }
			onZoomChanged={ () => {
				const newZoom = mapRef.current?.getZoom();
				if ( undefined === newZoom ) {
					return;
				} //end if
				onZoomChanged( newZoom );
			} }
			onCenterChanged={ () => {
				const newCenter = mapRef.current?.getCenter();
				if ( ! newCenter ) {
					return;
				} //end if

				const lat = newCenter.lat();
				const lng = newCenter.lng();
				onCenterChanged( `${ lat }`, `${ lng }` );
			} }
		>
			{ children }
		</GoogleMap>
	);
};
