/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Dashicon } from '@wordpress/components';

/**
 * External dependencies
 */
import { clsx } from 'clsx';
import { Marker } from 'react-google-maps';
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import './editor.scss';
import { Inspector } from './inspector';
import { ToolbarControls } from './toolbar';
import { MapBlock } from './map-block';
import {
	useGoogleMapsApiKey,
	useGoogleMapsUrl,
	useOptionsPageUrl,
} from './hooks';
import type { EditProps } from './types';

export const GoogleMapEdit = ( props: EditProps ): JSX.Element => {
	const blockProps = useBlockProps();

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
	} = props;

	const options = {
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		fullscreenControl: false,
		draggable: false,
		styles: safeParse( customStyle ),
	};

	const googleMapURL = useGoogleMapsUrl();
	const googleMapsApiKey = useGoogleMapsApiKey();
	const optionsPageUrl = useOptionsPageUrl();

	return (
		<div { ...blockProps }>
			<ToolbarControls { ...props } />

			<Inspector { ...props } />

			<section
				className={ clsx( [
					'nelio-maps-google-map',
					{ 'is-api-key-missing': ! googleMapsApiKey },
				] ) }
			>
				{ googleMapsApiKey ? (
					<>
						<MapBlock
							googleMapURL={ googleMapURL }
							loadingElement={
								<div style={ { height: '100%' } } />
							}
							mapElement={ <div style={ { height: '100%' } } /> }
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
								( value: number ) =>
									setAttributes( { zoom: value } ),
								500
							) }
							onCenterChanged={ debounce(
								( _lat: string, _lng: string ) =>
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

						{ isMarkerVisible && 'none' !== addressAlignment && (
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
					</>
				) : (
					<div className="nelio-maps-google-map-placeholder">
						<div>
							<Dashicon icon="location-alt" />
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
		</div>
	);
};

// =======
// HELPERS
// =======

function safeParse( json: string ): unknown {
	try {
		return JSON.parse( json );
	} catch ( _ ) {
		return [];
	} //end try
} //end safeParse()

function numberifyCoords( coords: {
	readonly lat: string;
	readonly lng: string;
} ) {
	return {
		lat: Number.parseFloat( coords.lat ) || 41.3947688,
		lng: Number.parseFloat( coords.lng ) || 2.0787284,
	};
} //end numberifyCoords()
