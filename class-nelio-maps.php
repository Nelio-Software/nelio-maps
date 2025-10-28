<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}//end if

/**
 * Nelio_Maps
 */
class Nelio_Maps {

	/**
	 * This instance.
	 *
	 * @var Nelio_Maps|null
	 */
	private static $instance;

	/**
	 * Plugin path.
	 *
	 * @var string
	 */
	public $plugin_path;

	/**
	 * Plugin URL.
	 *
	 * @var string
	 */
	public $plugin_url;

	/**
	 * Returns this instance.
	 *
	 * @return Nelio_Maps
	 */
	public static function instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->init();
			self::$instance->init_hooks();
		}//end if

		return self::$instance;
	}//end instance()

	/**
	 * Initializes instance.
	 *
	 * @return void
	 */
	private function init() {

		$this->plugin_path = untrailingslashit( plugin_dir_path( __FILE__ ) );
		$this->plugin_url  = untrailingslashit( plugin_dir_url( __FILE__ ) );

		// load textdomain.
		load_plugin_textdomain( 'nelio-maps' );
	}//end init()

	/**
	 * Hooks into WordPress.
	 *
	 * @return void
	 */
	private function init_hooks() {

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

	/**
	 * Callback to register block types.
	 *
	 * @return void
	 */
	public function register_block_types() {
		$blocks = array( 'google-map' );
		foreach ( $blocks as $block ) {
			register_block_type(
				$this->plugin_path . "/assets/dist/blocks/{$block}"
			);
		}//end foreach
	}//end register_block_types()

	/**
	 * Callback to register script dependencies.
	 *
	 * @return void
	 */
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

	/**
	 * Callback to register admin script dependencies.
	 *
	 * @return void
	 */
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

	/**
	 * Callback to add the “extra” category.
	 *
	 * @param list<array{slug:string,title:string}> $categories Categories.
	 *
	 * @return list<array{slug:string,title:string}> $categories
	 */
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

	/**
	 * Callback to register google maps API key option.
	 *
	 * @return void
	 */
	public function register_google_maps_api_key_option() {
		$api_key = get_option( 'nelio_maps_api_key_option', '' );
		update_option( 'nelio_maps_api_key_option', $api_key );
	}//end register_google_maps_api_key_option()
}//end class
