<?php
/**
 * The plugin bootstrap file
 *
 * @wordpress-plugin
 * Plugin Name:       Nelio Maps
 * Plugin URI:        https://neliosoftware.com
 * Description:       Simple and beautiful Google Maps block for WordPress.
 * Version:           2.0.0beta3
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

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}//end if

define( 'NELIO_MAPS', true );

function nelio_maps() {
	return Nelio_Maps::instance();
}//end nelio_maps()

/**
 * Nelio_Maps
 */
class Nelio_Maps {

	private static $instance = null;

	public $plugin_path;
	public $plugin_url;

	public static function instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->init_options();
			self::$instance->init_hooks();
		}//end if

		return self::$instance;
	}//end instance()

	public function init_options() {

		$this->plugin_path = untrailingslashit( plugin_dir_path( __FILE__ ) );
		$this->plugin_url  = untrailingslashit( plugin_dir_url( __FILE__ ) );

		// load textdomain.
		load_plugin_textdomain( 'nelio-maps' );
	}//end init_options()

	public function init_hooks() {

		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}//end if

		add_action( 'init', array( $this, 'register_block_types' ) );
		add_action( 'init', array( $this, 'register_google_maps_api_key_option' ) );
		add_filter( 'block_categories_all', array( $this, 'add_extra_category' ), 99 );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_script_dependencies' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_script_dependencies' ) );

		if ( is_admin() ) {
			require_once $this->plugin_path . '/options.php';
		}//end if
	}//end init_hooks()

	public function register_block_types() {
		$blocks = array( 'google-map' );
		foreach ( $blocks as $block ) {
			register_block_type(
				$this->plugin_path . "/assets/dist/blocks/{$block}"
			);
		}//end foreach
	}//end register_block_types()

	public function register_script_dependencies() {
		$plugin_version = get_file_data( __FILE__, array( 'Version' ), 'plugin' )[0];
		wp_register_script(
			'nelio-maps-google-map',
			add_query_arg(
				array(
					'key'       => get_option( 'nelio_maps_api_key_option', '' ),
					'libraries' => 'geometry,drawing,places',
				),
				'https://maps.googleapis.com/maps/api/js'
			),
			array(),
			$plugin_version,
			true
		);
	}//end register_script_dependencies()

	public function register_admin_script_dependencies() {
		$settings = array(
			'googleMapsApiKey' => get_option( 'nelio_maps_api_key_option', '' ),
			'optionsPageUrl'   => admin_url( 'options-general.php?page=nelio-maps' ),
		);

		wp_add_inline_script(
			'nelio-maps-google-map-editor-script',
			sprintf( 'NelioMaps = %s', wp_json_encode( $settings ) ),
			'before'
		);
	}//end register_admin_script_dependencies()

	public function add_extra_category( $categories ) {

		if ( count(
			array_filter(
				$categories,
				function ( $category ) {
					return 'extra' === $category['slug']; }
			)
		) ) {
			return $categories;
		}//end if

		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'extra',
					'title' => _x( 'Extra', 'text (block category)', 'nelio-maps' ),
				),
			)
		);
	}//end add_extra_category()

	public function register_google_maps_api_key_option() {
		$api_key = get_option( 'nelio_maps_api_key_option', '' );
		update_option( 'nelio_maps_api_key_option', $api_key );
	}//end register_google_maps_api_key_option()
}//end class

// Start plugin.
nelio_maps();
