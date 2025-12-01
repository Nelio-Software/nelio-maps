<?php
/**
 * The plugin bootstrap file
 *
 * @wordpress-plugin
 * Plugin Name:       Nelio Maps
 * Plugin URI:        https://neliosoftware.com
 * Description:       Simple and beautiful Google Maps block for WordPress.
 * Version:           2.0.1
 *
 * Author:            Nelio Software
 * Author URI:        http://neliosoftware.com
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 *
 * Requires at least: 6.6
 * Requires PHP:      7.4
 *
 * Text Domain:       nelio-maps
 *
 * @package Nelio_Maps
 * @author  David Aguilera <david.aguilera@neliosoftware.com>
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

define( 'NELIO_MAPS', true );
require untrailingslashit( __DIR__ ) . '/class-nelio-maps.php';

/**
 * Returns the unique instance of Nelio Map’s main class.
 *
 * @return Nelio_Maps
 *
 * @since 1.0.0
 */
function nelio_maps() {
	return Nelio_Maps::instance();
}//end nelio_maps()

// Start plugin.
nelio_maps();
