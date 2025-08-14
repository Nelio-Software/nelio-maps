/**
 * WordPress dependencies
 */
import { BaseControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

/**
 * External dependencies
 */
import { clsx } from 'clsx';

/**
 * Internal dependencies
 */
import './editor.scss';
import type { MapStyle } from '../../types';

export type ImagePickerProps< TValue extends string > = {
	readonly label: string;
	readonly value: string;
	readonly options: ReadonlyArray< MapStyle< TValue > >;
	readonly onChange: (
		value: NoInfer< TValue >,
		option: MapStyle< TValue >
	) => void;
};

export const ImagePicker = < TValue extends string >( {
	label,
	value,
	options,
	onChange,
}: ImagePickerProps< TValue > ): JSX.Element => {
	const instanceId = useInstanceId( ImagePicker );

	return (
		<BaseControl
			id={ `nelio-maps-image-picker-${ instanceId }` }
			label={ label }
			className="nelio-maps-image-picker"
		>
			{ options.map( ( option ) => {
				return (
					<button
						key={ `image-picker-${ option.value }` }
						onClick={ () => onChange( option.value, option ) }
						aria-pressed={ value === option.value }
						className={ clsx( 'nelio-maps-image-picker-item', {
							'nelio-maps-image-picker-item-active':
								value === option.value,
						} ) }
					>
						{ option.image && 'string' === typeof option.image && (
							<img
								src={ option.image }
								alt={ option.label || option.value }
							/>
						) }
						{ option.image &&
							'string' !== typeof option.image &&
							option.image }
						{ option.label && <span>{ option.label }</span> }
					</button>
				);
			} ) }
		</BaseControl>
	);
};
