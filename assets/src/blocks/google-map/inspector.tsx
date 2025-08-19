/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	CheckboxControl,
	ToggleControl,
	PanelBody,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { MapStyles } from './map-styles';
import { AddressSearch } from './address-search';
import { EditProps } from './types';
import { useGoogleMapsApiKey } from './hooks';

export const Inspector = ( {
	attributes: {
		addressAlignment,
		areZoomButtonsVisible,
		customStyle,
		height,
		isDraggable,
		isFullScreenButtonVisible,
		isMapTypeButtonVisible,
		isMarkerVisible,
		lat: centerLat,
		lng: centerLng,
		style,
		zoom,
	},
	setAttributes,
}: EditProps ): JSX.Element | null => {
	const googleMapsApiKey = useGoogleMapsApiKey();

	if ( ! googleMapsApiKey ) {
		return null;
	} //end if

	const center = { lat: centerLat, lng: centerLng };
	return (
		<InspectorControls>
			<PanelBody
				title={ _x( 'Appearance', 'text', 'nelio-maps' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ _x( 'Map Height', 'text', 'nelio-maps' ) }
					value={ height }
					onChange={ ( value = 0 ) =>
						setAttributes( {
							height: Math.min( Math.max( value, 20 ), 100 ),
						} )
					}
					help={ _x(
						'Percentage of the viewport height.',
						'text',
						'nelio-maps'
					) }
					min={ 20 }
					max={ 100 }
				/>

				<RangeControl
					label={ _x( 'Zoom Level', 'text', 'nelio-maps' ) }
					value={ zoom }
					onChange={ ( value = 0 ) =>
						setAttributes( {
							zoom: Math.min( Math.max( value, 1 ), 18 ),
						} )
					}
					min={ 1 }
					max={ 18 }
				/>

				<MapStyles
					value={ style }
					customStyle={ customStyle }
					onChange={ ( name, value ) =>
						setAttributes( {
							style: name,
							customStyle: value,
						} )
					}
				/>
			</PanelBody>

			<PanelBody
				title={ _x( 'Marker', 'text', 'nelio-maps' ) }
				initialOpen={ !! isMarkerVisible }
			>
				<ToggleControl
					label={ _x( 'Marker in map', 'text', 'nelio-maps' ) }
					checked={ !! isMarkerVisible }
					onChange={ ( value ) =>
						setAttributes( {
							marker: center,
							isMarkerVisible: value,
						} )
					}
				/>

				{ isMarkerVisible && (
					<>
						<AddressSearch
							placeholder={ _x(
								'Search location',
								'user',
								'nelio-maps'
							) }
							onChange={ ( lat, lng ) => {
								setAttributes( {
									marker: { lat, lng },
								} );
							} }
						/>

						<SelectControl
							label={ _x(
								'Address block',
								'text',
								'nelio-maps'
							) }
							value={ addressAlignment }
							options={ [
								{
									value: 'none',
									label: _x(
										'No address block',
										'text',
										'nelio-maps'
									),
								},
								{
									value: 'left',
									label: _x(
										'Align left',
										'command',
										'nelio-maps'
									),
								},
								{
									value: 'right',
									label: _x(
										'Align right',
										'command',
										'nelio-maps'
									),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									addressAlignment: value,
								} )
							}
						/>
					</>
				) }
			</PanelBody>

			<PanelBody
				title={ _x( 'Interaction', 'text', 'nelio-maps' ) }
				initialOpen={ false }
			>
				<CheckboxControl
					label={ _x( 'Show zoom buttons', 'command', 'nelio-maps' ) }
					checked={ !! areZoomButtonsVisible }
					onChange={ ( value ) =>
						setAttributes( {
							areZoomButtonsVisible: value,
						} )
					}
				/>

				<CheckboxControl
					label={ _x(
						'Show map type button',
						'command',
						'nelio-maps'
					) }
					checked={ !! isMapTypeButtonVisible }
					onChange={ ( value ) =>
						setAttributes( {
							isMapTypeButtonVisible: value,
						} )
					}
				/>

				<CheckboxControl
					label={ _x(
						'Show fullscreen button',
						'command',
						'nelio-maps'
					) }
					checked={ !! isFullScreenButtonVisible }
					onChange={ ( value ) =>
						setAttributes( {
							isFullScreenButtonVisible: value,
						} )
					}
				/>

				<CheckboxControl
					label={ _x(
						'Make the map draggable',
						'command',
						'nelio-maps'
					) }
					checked={ !! isDraggable }
					onChange={ ( value ) =>
						setAttributes( { isDraggable: value } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};
