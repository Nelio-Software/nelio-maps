// @ts-nocheck
/* eslint-disable */
// TODO DAVID. Maybe improve types at some point.

/**
 * External dependencies
 */
import { compose, withProps, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

export const MapBlock = compose(
	withProps( {
		loadingElement: <div style={ { height: '100%' } } />,
		mapElement: <div style={ { height: '100%' } } />,
	} ),
	withHandlers( () => {
		const refs = {
			map: undefined,
		};

		return {
			onMapMounted: () => ( ref ) => {
				refs.map = ref;
			},
			onZoomChanged: ( props ) => () => {
				props.onZoomChanged( refs.map.getZoom() );
			},
			onCenterChanged: ( props ) => () => {
				const center = refs.map.getCenter();

				const lat = center.lat();
				const lng = center.lng();
				props.onCenterChanged( `${ lat }`, `${ lng }` );
			},
		};
	} ),
	withScriptjs,
	withGoogleMap
)( ( props ) => {
	const { children } = props;

	return (
		<GoogleMap
			ref={ props.onMapMounted }
			zoom={ props.zoom }
			center={ props.center }
			options={ props.options }
			defaultZoom={ props.defaultZoom }
			defaultCenter={ props.defaultCenter }
			defaultOptions={ props.defaultOptions }
			onZoomChanged={ props.onZoomChanged }
			onCenterChanged={ props.onCenterChanged }
		>
			{ children }
		</GoogleMap>
	);
} ) as ( props: {
	readonly googleMapURL: string;
	readonly loadingElement: JSX.Element;
	readonly mapElement: JSX.Element;
	readonly containerElement: JSX.Element;
	readonly zoom: number;
	readonly center: { readonly lat: number; readonly lng: number };
	readonly options: Record< string, any >;
	readonly defaultZoom: number;
	readonly defaultCenter: { readonly lat: string; readonly lng: string };
	readonly defaultOptions: Record< string, any >;
	readonly onZoomChanged: ( zoom: number ) => void;
	readonly onCenterChanged: ( lat: string, lng: string ) => void;
	readonly children: JSX.Element | ReadonlyArray< JSX.Element >;
} ) => JSX.Element;
