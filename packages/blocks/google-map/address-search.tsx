/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';

/**
 * External dependencies
 */
import { withScriptjs } from 'react-google-maps';
import { compose, withState, withProps, withHandlers } from 'recompose';

const {
	StandaloneSearchBox,
} = require( 'react-google-maps/lib/components/places/StandaloneSearchBox' );

// TODO DAVID. Improve this component and remove cast.
export const AddressSearch = compose(
	withState( 'value', 'setValue', ( props ) => {
		return props.value;
	} ),

	withProps( {
		loadingElement: <div />,
		containerElement: <div />,
	} ),

	withHandlers( () => {
		const refs = {
			searchBox: undefined,
		};

		return {
			onSearchBoxMounted: () => ( ref ) => {
				refs.searchBox = ref;
			},

			onPlacesChanged: ( props ) => () => {
				const places = refs.searchBox.getPlaces();

				if ( ! props.onChange || ! places || ! places[ 0 ] ) {
					return;
				} //end if

				const { location } = places[ 0 ].geometry;
				props.onChange( `${ location.lat() }`, `${ location.lng() }` );
				props.setValue( places[ 0 ].formatted_address );
			},
		};
	} ),

	withScriptjs
)( ( props ) => {
	const {
		bounds,
		className,
		label,
		onPlacesChanged,
		onSearchBoxMounted,
		placeholder,
		setValue,
		value,
	} = props;

	return (
		<div data-standalone-searchbox="" className={ className }>
			<StandaloneSearchBox
				ref={ onSearchBoxMounted }
				bounds={ bounds }
				onPlacesChanged={ onPlacesChanged }
			>
				<TextControl
					label={ label }
					placeholder={ placeholder }
					value={ value }
					onChange={ ( newValue ) => setValue( newValue ) }
				/>
			</StandaloneSearchBox>
		</div>
	);
} ) as ( props: {
	readonly className?: string;
	readonly googleMapURL: string;
	readonly placeholder?: string;
	readonly onChange: ( lat: string, lng: string ) => void;
} ) => JSX.Element;
