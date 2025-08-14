/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ImagePicker } from './image-picker';

import defaultMapStyle from './default';
import darkMapStyle from './dark';
import lightMapStyle from './light';
import dawnMapStyle from './dawn';
import nightMapStyle from './night';
import customMapStyle from './custom';

const styles = [
	defaultMapStyle,
	nightMapStyle,
	lightMapStyle,
	darkMapStyle,
	dawnMapStyle,
	customMapStyle,
] as const;

type StyleName = ( typeof styles )[ number ][ 'value' ];

type MapStylesProps = {
	readonly value: StyleName;
	readonly customStyle: string;
	readonly onChange: ( name: StyleName, json: string ) => void;
};

export const MapStyles = ( {
	value,
	customStyle,
	onChange,
}: MapStylesProps ): JSX.Element => (
	<>
		<ImagePicker
			label={ _x( 'Style', 'text', 'nelio-maps' ) }
			value={ value }
			options={ styles }
			onChange={ ( styleName, style ) =>
				onChange(
					styleName,
					style.json ? JSON.stringify( style.json ) : ''
				)
			}
		/>

		{ 'custom' === value && (
			<TextareaControl
				label={ _x( 'JSON Style', 'text', 'nelio-maps' ) }
				placeholder={ _x( 'Enter JSON style', 'user', 'nelio-maps' ) }
				help={
					<p>
						{ _x(
							'You can use custom styles presets from Snazzy Maps.',
							'text',
							'nelio-maps'
						) }{ ' ' }
						<a
							href="https://snazzymaps.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{ _x(
								'Check them out here!',
								'user (snazzy maps)',
								'nelio-maps'
							) }
						</a>
					</p>
				}
				value={ customStyle || '' }
				onChange={ ( style ) => onChange( 'custom', style ) }
			/>
		) }
	</>
);
