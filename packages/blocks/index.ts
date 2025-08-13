/**
 * WordPress dependencies
 */
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as map from './google-map';

[ map ].forEach( ( block ) => {
	if ( ! block ) {
		return;
	} //end if

	// Register the block in the editor.
	const { name, settings } = block;
	registerBlockType( name, settings );

	// Register new block styles.
	const styles = block.styles || [];
	styles.forEach( ( style ) => registerBlockStyle( name, style ) );
} );
