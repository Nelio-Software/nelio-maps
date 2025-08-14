/**
 * WordPress dependencies
 */
import {
	BlockControls,
	BlockAlignmentToolbar,
	useBlockProps,
} from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

import {
	Button,
	Dashicon,
	Dropdown,
	Toolbar,
	Tooltip,
} from '@wordpress/components';

/**
 * External dependencies
 */
import { clsx } from 'clsx';

/**
 * Internal dependencies
 */
import { AddressSearch } from './address-search';
import type { EditProps } from './types';
import { useGoogleMapsUrl } from './hooks';

export const ToolbarControls = ( {
	attributes: { addressAlignment, blockAlignment, isMarkerVisible },
	setAttributes,
}: EditProps ): JSX.Element => {
	const blockProps = useBlockProps();
	const googleMapsUrl = useGoogleMapsUrl();
	return (
		<div { ...blockProps }>
			<BlockControls>
				<BlockAlignmentToolbar
					value={ blockAlignment }
					controls={ [ 'center', 'wide', 'full' ] }
					onChange={ ( value ) =>
						setAttributes( { blockAlignment: value } )
					}
				/>

				<Toolbar label={ _x( 'Map', 'text', 'nelio-maps' ) }>
					<Dropdown
						renderToggle={ ( { onToggle } ) => (
							<Button
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
										onChange={ ( lat, lng ) => {
											setAttributes( { lat, lng } );
										} }
									/>
								</>
							);
						} }
					/>
				</Toolbar>

				{ isMarkerVisible && (
					<Toolbar label={ _x( 'Marker', 'text', 'nelio-maps' ) }>
						<Dropdown
							renderToggle={ ( { onToggle } ) => (
								<Button
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
											onChange={ ( lat, lng ) => {
												setAttributes( {
													marker: { lat, lng },
												} );
											} }
										/>
									</>
								);
							} }
						/>

						<Tooltip
							text={ _x(
								'Left address block',
								'command',
								'nelio-maps'
							) }
						>
							<Button
								className={ clsx(
									'components-icon-button',
									'components-toolbar__control',
									{ 'is-active': 'left' === addressAlignment }
								) }
								onClick={ () =>
									setAttributes( {
										addressAlignment:
											'left' !== addressAlignment
												? 'left'
												: 'none',
									} )
								}
							>
								<Dashicon icon="align-left" />
							</Button>
						</Tooltip>

						<Tooltip
							text={ _x(
								'Right address block',
								'command',
								'nelio-maps'
							) }
						>
							<Button
								className={ clsx(
									'components-icon-button',
									'components-toolbar__control',
									{
										'is-active':
											'right' === addressAlignment,
									}
								) }
								onClick={ () =>
									setAttributes( {
										addressAlignment:
											'right' !== addressAlignment
												? 'right'
												: 'none',
									} )
								}
							>
								<Dashicon icon="align-right" />
							</Button>
						</Tooltip>
					</Toolbar>
				) }
			</BlockControls>
		</div>
	);
};
