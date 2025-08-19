/**
 * WordPress dependencies
 */
import { ComboboxControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

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
	const autocomplete = useAutocompleteService();
	const places = usePlacesService();

	const [ query, setQuery ] = useState( '' );
	const [ predictions, setPredictions ] = useState<
		ReadonlyArray< google.maps.places.AutocompletePrediction >
	>( [] );

	useEffect( () => {
		void autocomplete?.getPlacePredictions( { input: query }, ( results ) =>
			setPredictions( results || [] )
		);
	}, [ query, autocomplete ] );

	const handleSelect = (
		placeId:
			| google.maps.places.PlaceDetailsRequest[ 'placeId' ]
			| null
			| undefined
	) => {
		const value = predictions.find( ( p ) => p.place_id === placeId );
		if ( ! placeId || ! value ) {
			return;
		} //end if

		setPredictions( [ value ] );
		const description = value.description;

		places?.getDetails( { placeId }, ( place ) => {
			if ( place && place.geometry ) {
				const location = place.geometry.location;
				if ( ! location ) {
					return;
				} //end if
				onChange( `${ location.lat() }`, `${ location.lng() }` );
			}
		} );

		setQuery( description );
	};

	return (
		<ComboboxControl
			className={ className }
			label={ label }
			value={ predictions[ 0 ]?.place_id }
			placeholder={ placeholder }
			allowReset={ false }
			onFilterValueChange={ setQuery }
			options={ predictions.map( ( p ) => ( {
				value: p.place_id,
				label: p.description,
			} ) ) }
			onChange={ handleSelect }
			expandOnFocus={ false }
		/>
	);
};

// =====
// HOOKS
// =====

const useAutocompleteService = () => {
	const [ service, setService ] =
		useState< google.maps.places.AutocompleteService | null >( null );
	useEffect( () => {
		if ( ! service ) {
			setService( new google.maps.places.AutocompleteService() );
		}
	}, [ service ] );
	return service;
};

const usePlacesService = () => {
	const [ service, setService ] =
		useState< google.maps.places.PlacesService | null >( null );
	useEffect( () => {
		if ( ! service ) {
			setService(
				new window.google.maps.places.PlacesService(
					document.createElement( 'div' )
				)
			);
		}
	}, [ service ] );
	return service;
};
