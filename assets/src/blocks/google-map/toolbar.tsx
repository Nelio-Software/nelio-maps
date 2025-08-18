/**
 * WordPress dependencies
 */
import { BlockControls, BlockAlignmentToolbar } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

import { Dropdown, ToolbarButton, ToolbarGroup } from '@wordpress/components';

/**
 * External dependencies
 */
import { clsx } from 'clsx';

/**
 * Internal dependencies
 */
import { AddressSearch } from './address-search';
import { useGoogleMapsUrl } from './hooks';
import type { EditProps } from './types';

export const ToolbarControls = ( {
	attributes: { addressAlignment, blockAlignment, isMarkerVisible },
	setAttributes,
}: EditProps ): JSX.Element => {
	const googleMapsUrl = useGoogleMapsUrl();
	return (
		/* @ts-expect-error BlockControls should work… */
		<BlockControls>
			{ /* @ts-expect-error BlockAlignmentToolbar should work… */ }
			<BlockAlignmentToolbar
				value={ blockAlignment }
				controls={ [ 'center', 'wide', 'full' ] }
				onChange={ ( value ) =>
					setAttributes( { blockAlignment: value } )
				}
			/>

			<ToolbarGroup>
				<Dropdown
					renderToggle={ ( { onToggle } ) => (
						<ToolbarButton
							label={ _x(
								'Center map',
								'command',
								'nelio-maps'
							) }
							icon="search"
							onClick={ onToggle }
						/>
					) }
					renderContent={ () => {
						return (
							<>
								<AddressSearch
									className="nelio-maps-address-search-dropdown"
									googleMapURL={ googleMapsUrl }
									placeholder={ _x(
										'Search location',
										'user',
										'nelio-maps'
									) }
									onChange={ ( lat, lng ) =>
										setAttributes( { lat, lng } )
									}
								/>
							</>
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
						renderContent={ () => {
							return (
								<>
									<AddressSearch
										className="nelio-maps-address-search-dropdown"
										googleMapURL={ googleMapsUrl }
										placeholder={ _x(
											'Search location',
											'user',
											'nelio-maps'
										) }
										onChange={ ( lat, lng ) =>
											setAttributes( {
												marker: { lat, lng },
											} )
										}
									/>
								</>
							);
						} }
					/>

					<ToolbarButton
						className={ clsx(
							'components-icon-button',
							'components-toolbar__control',
							{ 'is-active': 'left' === addressAlignment }
						) }
						label={ _x(
							'Left address block',
							'command',
							'nelio-maps'
						) }
						icon="align-left"
						onClick={ () =>
							setAttributes( {
								addressAlignment:
									'left' !== addressAlignment
										? 'left'
										: 'none',
							} )
						}
					/>
					<ToolbarButton
						icon="align-right"
						className={ clsx(
							'components-icon-button',
							'components-toolbar__control',
							{
								'is-active': 'right' === addressAlignment,
							}
						) }
						label={ _x(
							'Right address block',
							'command',
							'nelio-maps'
						) }
						onClick={ () =>
							setAttributes( {
								addressAlignment:
									'right' !== addressAlignment
										? 'right'
										: 'none',
							} )
						}
					/>
				</ToolbarGroup>
			) }
		</BlockControls>
	);
};
