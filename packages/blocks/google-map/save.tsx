/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/editor';

/**
 * External dependencies
 */
import { clsx } from 'clsx';

const GoogleMapSave = ( props ) => {
	const {
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
	} = props;

	const attributes = {
		style: { minHeight: `${ height }vh` },
		'data-styles': customStyle,
		'data-is-draggable': isDraggable ? 'true' : 'false',
		'data-show-fullscreen-button': isFullScreenButtonVisible
			? 'true'
			: 'false',
		'data-show-map-type-button': isMapTypeButtonVisible ? 'true' : 'false',
		'data-show-zoom-buttons': areZoomButtonsVisible ? 'true' : 'false',
		'data-lat': lat,
		'data-lng': lng,
		'data-zoom': zoom,
	};

	return (
		<div
			className={ clsx( [
				'nelio-maps-google-map',
				{ [ `align${ blockAlignment }` ]: blockAlignment },
				className,
			] ) }
		>
			<div className="nelio-maps-google-map-wrapper" { ...attributes }>
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
};

export default GoogleMapSave;
