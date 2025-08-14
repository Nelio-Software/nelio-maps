/**
 * WordPress dependencies
 */
import { BlockAlignmentToolbar } from '@wordpress/block-editor';

export type Attributes = {
	// Map options.
	readonly isDraggable: boolean;
	readonly blockAlignment?: BlockAlignmentToolbar.Control;
	readonly height: number;

	// Map location.
	readonly lat: string;
	readonly lng: string;
	readonly zoom: number;

	// Map styling.
	readonly style: 'default' | 'night' | 'light' | 'dark' | 'dawn' | 'custom';
	readonly customStyle: string;

	// Buttons.
	readonly areZoomButtonsVisible: boolean;
	readonly isMapTypeButtonVisible: boolean;
	readonly isFullScreenButtonVisible: boolean;

	// Marker.
	readonly isMarkerVisible: boolean;
	readonly marker: {
		readonly lat: string;
		readonly lng: string;
	};
	readonly address: string;
	readonly addressAlignment: 'none' | 'left' | 'right';
};

export type EditProps = {
	readonly attributes: Attributes;
	readonly setAttributes: ( attrs: Partial< Attributes > ) => void;
	readonly className?: string;
};

export type MapStyle< T extends string > = {
	readonly value: T;
	readonly label: string;
	readonly image: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly json: any;
};
