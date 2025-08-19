/**
 * WordPress dependencies
 */
import { useCallback, useEffect, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import {
	Map,
	type MapCameraChangedEvent,
	type MapProps,
} from '@vis.gl/react-google-maps';

export type MapBlockProps = {
	readonly zoom: number;
	readonly height: string;
	readonly center: { readonly lat: number; readonly lng: number };
	readonly options: Pick<
		MapProps,
		| 'disableDefaultUI'
		| 'zoomControl'
		| 'mapTypeControl'
		| 'streetViewControl'
		| 'fullscreenControl'
		| 'draggable'
		| 'styles'
	>;
	readonly onZoomChanged: ( zoom: number ) => void;
	readonly onCenterChanged: ( lat: string, lng: string ) => void;
	readonly children: JSX.Element | ReadonlyArray< JSX.Element >;
};

export const MapBlock = ( {
	zoom,
	height,
	center: givenCenter,
	children,
	options,
	onZoomChanged,
	onCenterChanged,
}: MapBlockProps ): JSX.Element => {
	const [ center, setCenter ] = useState( givenCenter );
	const onCenterChangedCallback = useCallback(
		( event: MapCameraChangedEvent ) => {
			const newCenter = event.map.getCenter();
			if ( ! newCenter ) {
				return;
			} //end if

			const lat = newCenter.lat();
			const lng = newCenter.lng();
			setCenter( { lat, lng } );
			onCenterChanged( `${ lat }`, `${ lng }` );
		},
		[]
	);

	useEffect( () => {
		if (
			givenCenter.lat === center.lat &&
			givenCenter.lng === center.lng
		) {
			return;
		} //end if
		setCenter( givenCenter );
	}, [ givenCenter ] );

	return (
		<Map
			style={ { height } }
			zoom={ zoom }
			center={ center }
			onZoomChanged={ ( event ) => {
				const newZoom = event.map.getZoom();
				if ( undefined === newZoom ) {
					return;
				} //end if
				onZoomChanged( newZoom );
			} }
			onCenterChanged={ onCenterChangedCallback }
			{ ...options }
		>
			{ children }
		</Map>
	);
};
