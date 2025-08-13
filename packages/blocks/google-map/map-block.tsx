/**
 * External dependencies
 */
import { compose, withProps, withHandlers } from 'recompose';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
} from 'react-google-maps';

const MapBlock = compose(
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

} );

export default MapBlock;
