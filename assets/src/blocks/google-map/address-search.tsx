/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { trim } from 'lodash';

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
	const [ query, doSetQuery ] = useState( '' );
	const [ predictions, setPredictions ] = useState<
		ReadonlyArray< google.maps.places.AutocompletePrediction >
	>( [] );
	const [ service, setService ] =
		useState< google.maps.places.AutocompleteService | null >( null );
	const [ arePredictionsShown, showPredictions ] = useState( false );

	const setQuery = ( v: string ) => {
		doSetQuery( v );
		showPredictions( !! trim( v ) );
	};

	useEffect( () => {
		if ( ! service ) {
			setService( new google.maps.places.AutocompleteService() );
		}
	}, [ service ] );

	useEffect( () => {
		if ( ! query || ! service ) {
			setPredictions( [] );
			return;
		}

		const request = { input: query };
		void service.getPlacePredictions( request, ( results ) => {
			if ( results ) {
				setPredictions( results );
			} else {
				setPredictions( [] );
			}
		} );
	}, [ query, service ] );

	const handleSelect = (
		placeId: google.maps.places.PlaceDetailsRequest[ 'placeId' ],
		description: string
	) => {
		const placesService = new window.google.maps.places.PlacesService(
			document.createElement( 'div' )
		);

		placesService.getDetails( { placeId }, ( place ) => {
			if ( place && place.geometry ) {
				const location = place.geometry.location;
				if ( ! location ) {
					return;
				} //end if
				onChange( `${ location.lat() }`, `${ location.lng() }` );
			}
		} );

		setQuery( description );
		showPredictions( false );
	};

	return (
		<div className={ className }>
			<TextControl
				label={ label }
				value={ query }
				onChange={ setQuery }
				placeholder={ placeholder }
			/>

			{ arePredictionsShown && predictions.length > 0 && (
				<ul className="TODO DAVID absolute z-10 w-full bg-white border rounded-lg shadow-md">
					{ predictions.map( ( p ) => (
						<li
							key={ p.place_id }
							onClick={ () =>
								handleSelect( p.place_id, p.description )
							}
							className="TODO DAVID p-2 cursor-pointer hover:bg-gray-100"
						>
							{ p.description }
						</li>
					) ) }
				</ul>
			) }
		</div>
	);
};
