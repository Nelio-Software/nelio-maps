/**
 * WordPress dependencies
 */
import { BlockControls, BlockAlignmentToolbar } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

import { Dropdown, ToolbarButton, ToolbarGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AddressSearch } from './address-search';
import type { EditProps } from './types';

export const ToolbarControls = ( {
	attributes: { addressAlignment, blockAlignment, isMarkerVisible, zoom },
	setAttributes,
}: EditProps ): JSX.Element => (
	/* @ts-expect-error BlockControls should work… */
	<BlockControls>
		{ /* @ts-expect-error BlockAlignmentToolbar should work… */ }
		<BlockAlignmentToolbar
			value={ blockAlignment }
			controls={ [ 'center', 'wide', 'full' ] }
			onChange={ ( value ) => setAttributes( { blockAlignment: value } ) }
		/>

		<ToolbarGroup>
			<Dropdown
				renderToggle={ ( { onToggle } ) => (
					<ToolbarButton
						label={ _x( 'Center map', 'command', 'nelio-maps' ) }
						icon="search"
						onClick={ onToggle }
					/>
				) }
				renderContent={ ( { onClose } ) => {
					return (
						<AddressSearch
							className="nelio-maps-address-search-dropdown"
							placeholder={ _x(
								'Search location',
								'user',
								'nelio-maps'
							) }
							onChange={ ( lat, lng ) => {
								setAttributes( {
									lat,
									lng,
									marker: { lat, lng },
									zoom: Math.max( 12, zoom ),
								} );
								onClose();
							} }
						/>
					);
				} }
			/>
		</ToolbarGroup>

		{ isMarkerVisible && (
			<ToolbarGroup>
				<Dropdown
					renderToggle={ ( { onToggle } ) => (
						<ToolbarButton
							label={ _x(
								'Set marker location',
								'command',
								'nelio-maps'
							) }
							icon="location"
							onClick={ onToggle }
						/>
					) }
					popoverProps={ { onFocusOutside: () => void null } }
					renderContent={ ( { onClose } ) => {
						return (
							<AddressSearch
								className="nelio-maps-address-search-dropdown"
								placeholder={ _x(
									'Search location',
									'user',
									'nelio-maps'
								) }
								onChange={ ( lat, lng ) => {
									setAttributes( {
										marker: { lat, lng },
									} );
									onClose();
								} }
							/>
						);
					} }
				/>

				<ToolbarButton
					label={ _x(
						'Left address block',
						'command',
						'nelio-maps'
					) }
					icon="align-left"
					isActive={ 'left' === addressAlignment }
					onClick={ () =>
						setAttributes( {
							addressAlignment:
								'left' !== addressAlignment ? 'left' : 'none',
						} )
					}
				/>
				<ToolbarButton
					icon="align-right"
					isActive={ 'right' === addressAlignment }
					label={ _x(
						'Right address block',
						'command',
						'nelio-maps'
					) }
					onClick={ () =>
						setAttributes( {
							addressAlignment:
								'right' !== addressAlignment ? 'right' : 'none',
						} )
					}
				/>
			</ToolbarGroup>
		) }
	</BlockControls>
);
