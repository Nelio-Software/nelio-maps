/**
 * External dependencies
 */
import { Map, type MapProps } from '@vis.gl/react-google-maps';

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
	center,
	children,
	options,
	onZoomChanged,
	onCenterChanged,
}: MapBlockProps ): JSX.Element => (
	<Map
		{ ...options }
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
		onCenterChanged={ ( event ) => {
			const newCenter = event.map.getCenter();
			if ( ! newCenter ) {
				return;
			} //end if

			const lat = newCenter.lat();
			const lng = newCenter.lng();
			onCenterChanged( `${ lat }`, `${ lng }` );
		} }
	>
		{ children }
	</Map>
);
