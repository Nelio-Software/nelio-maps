/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import { clsx } from 'clsx';
import type { EditProps } from './types';

export const GoogleMapSave = ( {
	attributes: {
		address,
		addressAlignment,
		areZoomButtonsVisible,
		blockAlignment,
		customStyle,
		height,
		isDraggable,
		isFullScreenButtonVisible,
		isMapTypeButtonVisible,
		isMarkerVisible,
		lat,
		lng,
		marker,
		zoom,
	},
	className,
}: EditProps ): JSX.Element => (
	<div
		className={ clsx( [
			'nelio-maps-google-map',
			{ [ `align${ blockAlignment }` ]: blockAlignment },
			className,
		] ) }
	>
		<div
			className="nelio-maps-google-map-wrapper"
			{ ...{
				style: { minHeight: `${ height }vh` },
				'data-styles': customStyle,
				'data-is-draggable': isDraggable ? 'true' : 'false',
				'data-show-fullscreen-button': isFullScreenButtonVisible
					? 'true'
					: 'false',
				'data-show-map-type-button': isMapTypeButtonVisible
					? 'true'
					: 'false',
				'data-show-zoom-buttons': areZoomButtonsVisible
					? 'true'
					: 'false',
				'data-lat': lat,
				'data-lng': lng,
				'data-zoom': zoom,
			} }
		>
			{ isMarkerVisible && (
				<div
					className="marker"
					data-lat={ marker.lat }
					data-lng={ marker.lng }
				></div>
			) }
		</div>

		{ isMarkerVisible && 'none' !== addressAlignment && (
			<RichText.Content
				tagName="p"
				className={ clsx( [
					'address',
					`align-${ addressAlignment }`,
				] ) }
				value={ address }
			/>
		) }
	</div>
);
