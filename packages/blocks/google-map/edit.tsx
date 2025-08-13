/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';
import { Dashicon } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

/**
 * External dependencies
 */
import { clsx } from 'clsx';
import { Marker } from 'react-google-maps';
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import ToolbarControls from './toolbar';

import MapBlock from './map-block';

const { googleMapsApiKey, optionsPageUrl } = window.NelioMaps;
const GOOGLE_MAPS_URL =
	'https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places';

export default class GoogleMapEdit extends Component {
	parseGoogleMapsStyle( style ) {
		try {
			return JSON.parse( style );
		} catch ( e ) {
			return [];
		} //end try
	} //end parseGoogleMapsStyle()

	render() {
		const {
			attributes: {
				address,
				addressAlignment,
				customStyle,
				height,
				isMarkerVisible,
				lat,
				lng,
				marker,
				zoom,
			},
			setAttributes,
		} = this.props;

		const options = {
			zoomControl: true,
			mapTypeControl: false,
			streetViewControl: false,
			fullscreenControl: false,
			gestureHandling: 'cooperative',
			draggable: true,
			styles: this.parseGoogleMapsStyle( customStyle ),
		};

		const googleMapURL = GOOGLE_MAPS_URL + '&key=' + googleMapsApiKey;

		return (
			<Fragment>
				<ToolbarControls { ...{ googleMapURL, ...this.props } } />

				<Inspector { ...{ googleMapURL, ...this.props } } />

				<section
					className={ clsx( [
						'nelio-maps-google-map',
						{ 'is-api-key-missing': ! googleMapsApiKey },
					] ) }
				>
					{ googleMapsApiKey ? (
						<Fragment>
							<MapBlock
								googleMapURL={ googleMapURL }
								loadingElement={
									<div style={ { height: '100%' } } />
								}
								mapElement={
									<div style={ { height: '100%' } } />
								}
								containerElement={
									<div
										className="nelio-maps-google-map-wrap"
										style={ {
											height: `${ Math.floor(
												height * 0.7
											) }vh`,
										} }
									/>
								}
								zoom={ zoom }
								center={ numberifyCoords( { lat, lng } ) }
								options={ options }
								defaultZoom={ zoom }
								defaultCenter={ { lat, lng } }
								defaultOptions={ options }
								onZoomChanged={ debounce(
									( value ) =>
										setAttributes( { zoom: value } ),
									500
								) }
								onCenterChanged={ debounce(
									( _lat, _lng ) =>
										setAttributes( {
											lat: _lat,
											lng: _lng,
										} ),
									500
								) }
							>
								<Marker
									position={ numberifyCoords( {
										lat: marker.lat,
										lng: marker.lng,
									} ) }
									clickable={ false }
									opacity={ isMarkerVisible ? 1 : 0 }
								/>
							</MapBlock>

							{ isMarkerVisible &&
								'none' !== addressAlignment && (
									<div
										className={ clsx( [
											'address',
											`align-${ addressAlignment }`,
										] ) }
									>
										<RichText
											tagName="p"
											value={ address }
											onChange={ ( value ) =>
												setAttributes( {
													address: value,
												} )
											}
											placeholder={ _x(
												'Add address',
												'user',
												'nelio-maps'
											) }
											keepPlaceholderOnFocus={ true }
										/>
									</div>
								) }
						</Fragment>
					) : (
						<div className="nelio-maps-google-map-placeholder">
							<div>
								<Dashicon icon="location" />
							</div>
							<div className="nelio-maps-google-map-placeholder-key">
								<p>
									<span className="screen-reader-text">
										{ _x( 'Error:', 'text', 'nelio-maps' ) }
									</span>{ ' ' }
									{ _x(
										'Google Maps API Key Required',
										'text',
										'nelio-maps'
									) }
								</p>
								<p>
									<a
										href={ optionsPageUrl }
										target="_blank"
										rel="noopener noreferrer"
									>
										{ _x(
											'Please add an API key in the plugin settings screen',
											'user',
											'nelio-maps'
										) }
									</a>
								</p>
							</div>
						</div>
					) }
				</section>
			</Fragment>
		);
	} //end render()
} //end class

function numberifyCoords( coords ) {
	return {
		lat: Number.parseFloat( coords.lat ) || 41.3947688,
		lng: Number.parseFloat( coords.lng ) || 2.0787284,
	};
} //end numberifyCoords()
