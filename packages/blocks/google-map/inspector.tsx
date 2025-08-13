/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import {
	Component,
	Fragment,
} from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
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
import MapStyles from './map-styles/map-styles';
import AddressSearch from './address-search';

const { googleMapsApiKey } = window.NelioMaps;

export default class Inspector extends Component {

	render() {

		const {
			attributes: {
				addressAlignment,
				areZoomButtonsVisible,
				customStyle,
				height,
				isDraggable,
				isFullScreenButtonVisible,
				isMapTypeButtonVisible,
				isMarkerVisible,
				style,
				zoom,
			},
			googleMapURL,
			setAttributes,
		} = this.props;

		return (
			<InspectorControls>

				{ googleMapsApiKey && (
					<Fragment>

						<PanelBody>

							<RangeControl
								label={ _x( 'Map Height', 'text', 'nelio-maps' ) }
								value={ height }
								onChange={ ( value ) => setAttributes( { height: Math.min( Math.max( value, 20 ), 100 ) } ) }
								help={ _x( 'Percentage of the viewport height.', 'text', 'nelio-maps' ) }
								min={ 20 }
								max={ 100 }
							/>

							<RangeControl
								label={ _x( 'Zoom Level', 'text', 'nelio-maps' ) }
								value={ zoom }
								onChange={ ( value ) => setAttributes( { zoom: value } ) }
								min={ 1 }
								max={ 18 }
							/>

						</PanelBody>

						<PanelBody
							title={ _x( 'Style', 'text', 'nelio-maps' ) }
							initialOpen={ false }
						>

							<MapStyles
								value={ style }
								customStyle={ customStyle }
								onChange={ ( name, value ) => setAttributes( { style: name, customStyle: value } ) }
							/>

						</PanelBody>

						<PanelBody
							title={ _x( 'Marker', 'text', 'nelio-maps' ) }
							initialOpen={ false }
						>

							<ToggleControl
								label={ _x( 'Marker in map', 'text', 'nelio-maps' ) }
								checked={ !! isMarkerVisible }
								onChange={ ( value ) => setAttributes( { isMarkerVisible: value } ) }
							/>

							{ isMarkerVisible && (
								<Fragment>

									<p>
										<AddressSearch
											googleMapURL={ googleMapURL }
											placeholder={ _x( 'Search location', 'user', 'nelio-maps' ) }
											onChange={ ( lat, lng ) => {
												setAttributes( { marker: { lat, lng } } );
											} }
										/>
									</p>

									<SelectControl
										label={ _x( 'Address block', 'text', 'nelio-maps' ) }
										value={ addressAlignment }
										options={ [
											{ value: 'none', label: _x( 'No address block', 'text', 'nelio-maps' ) },
											{ value: 'left', label: _x( 'Align left', 'command', 'nelio-maps' ) },
											{ value: 'right', label: _x( 'Align right', 'command', 'nelio-maps' ) },
										] }
										onChange={ ( value ) => setAttributes( { addressAlignment: value } ) }
									/>

								</Fragment>
							) }

						</PanelBody>

						<PanelBody
							title={ _x( 'Map Options', 'text', 'nelio-maps' ) }
							initialOpen={ false }
						>

							<p><em>{ _x( 'Tweak the front-end appearance of your map:', 'user', 'nelio-maps' ) }</em></p>

							<CheckboxControl
								label={ _x( 'Show zoom buttons', 'command', 'nelio-maps' ) }
								checked={ !! areZoomButtonsVisible }
								onChange={ ( value ) => setAttributes( { areZoomButtonsVisible: value } ) }
							/>

							<CheckboxControl
								label={ _x( 'Show map type button', 'command', 'nelio-maps' ) }
								checked={ !! isMapTypeButtonVisible }
								onChange={ ( value ) => setAttributes( { isMapTypeButtonVisible: value } ) }
							/>

							<CheckboxControl
								label={ _x( 'Show fullscreen button', 'command', 'nelio-maps' ) }
								checked={ !! isFullScreenButtonVisible }
								onChange={ ( value ) => setAttributes( { isFullScreenButtonVisible: value } ) }
							/>

							<CheckboxControl
								label={ _x( 'Make the map draggable', 'command', 'nelio-maps' ) }
								checked={ !! isDraggable }
								onChange={ ( value ) => setAttributes( { isDraggable: value } ) }
							/>

						</PanelBody>

					</Fragment>

				) }

			</InspectorControls>

		);

	}//end render()

}//end class

