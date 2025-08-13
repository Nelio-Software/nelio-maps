/**
 * WordPress dependencies
 */
import { BlockControls, BlockAlignmentToolbar } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import { _x } from '@wordpress/i18n';

import {
	Button,
	Dashicon,
	Dropdown,
	IconButton,
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
import AddressSearch from './address-search';

export default class ToolbarControls extends Component {
	render() {
		const {
			attributes: { addressAlignment, blockAlignment, isMarkerVisible },
			googleMapURL,
			setAttributes,
		} = this.props;

		return (
			<BlockControls>
				<BlockAlignmentToolbar
					value={ blockAlignment }
					controls={ [ 'center', 'wide', 'full' ] }
					onChange={ ( value ) =>
						setAttributes( { blockAlignment: value } )
					}
				/>

				<Toolbar>
					<Dropdown
						renderToggle={ ( { onToggle } ) => (
							<IconButton
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
								<Fragment>
									<AddressSearch
										className="nelio-maps-address-search-dropdown"
										googleMapURL={ googleMapURL }
										placeholder={ _x(
											'Search location',
											'user',
											'nelio-maps'
										) }
										onChange={ ( lat, lng ) => {
											setAttributes( { lat, lng } );
										} }
									/>
								</Fragment>
							);
						} }
					/>
				</Toolbar>

				{ isMarkerVisible && (
					<Toolbar>
						<Dropdown
							renderToggle={ ( { onToggle } ) => (
								<IconButton
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
									<Fragment>
										<AddressSearch
											className="nelio-maps-address-search-dropdown"
											googleMapURL={ googleMapURL }
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
									</Fragment>
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
		);
	} //end render()
} //end class
