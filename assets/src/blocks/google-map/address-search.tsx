/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { StandaloneSearchBox } from '@react-google-maps/api';

export type AddressSearchProps = {
	readonly className?: string;
	readonly label?: string;
	readonly placeholder?: string;
	readonly onChange: ( lat: string, lng: string ) => void;
};

export const AddressSearch = ( {
	className,
	label,
	placeholder,
	onChange,
}: AddressSearchProps ): JSX.Element => {
	const searchBoxRef = useRef< google.maps.places.SearchBox | null >( null );

	const [ value, setValue ] = useState( '' );
	const onPlacesChanged = () => {
		const place = searchBoxRef.current?.getPlaces()?.[ 0 ];
		if ( ! place ) {
			return;
		} //end if

		const location = place.geometry?.location;
		if ( ! location ) {
			return;
		} //end if

		onChange( `${ location.lat() }`, `${ location.lng() }` );
		setValue( place.formatted_address || value );
	};

	return (
		<div className={ className }>
			<StandaloneSearchBox
				onLoad={ ( ref ) => {
					searchBoxRef.current = ref;
				} }
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
};
