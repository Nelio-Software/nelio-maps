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
import { APIProvider, MapProps, Marker } from '@vis.gl/react-google-maps';

/**
 * Internal dependencies
 */
import './editor.scss';
import { Inspector } from './inspector';
import { ToolbarControls } from './toolbar';
import { MapBlock } from './map-block';
import { useGoogleMapsApiKey, useOptionsPageUrl } from './hooks';
import type { EditProps } from './types';

export const GoogleMapEdit = ( props: EditProps ): JSX.Element => {
	const blockProps = useBlockProps();
	const googleMapsApiKey = useGoogleMapsApiKey();
	const optionsPageUrl = useOptionsPageUrl();

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
		zoomControl: true,
		mapTypeControl: false,
		streetViewControl: false,
		fullscreenControl: false,
		draggable: true,
		styles: safeParse( customStyle ),
	};

	return (
		<div { ...blockProps }>
			<APIProvider apiKey={ googleMapsApiKey } libraries={ [ 'places' ] }>
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
								zoom={ zoom }
								height={ `${ Math.floor( height * 0.7 ) }vh` }
								center={ numberifyCoords( { lat, lng } ) }
								options={ options }
								onZoomChanged={ ( value ) =>
									setAttributes( { zoom: value } )
								}
								onCenterChanged={ (
									_lat: string,
									_lng: string
								) =>
									setAttributes( {
										lat: _lat,
										lng: _lng,
									} )
								}
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
			</APIProvider>
		</div>
	);
};

// =======
// HELPERS
// =======

function safeParse( json: string ) {
	try {
		return JSON.parse( json ) as MapProps[ 'styles' ];
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
