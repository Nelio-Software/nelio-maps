<?php

defined( 'ABSPATH' ) || exit;

/**
 * Callback to register Settings screen.
 *
 * @return void
 */
function nelio_maps_options_page() {
	add_options_page(
		'Nelio Maps',
		'Nelio Maps',
		'manage_options',
		'nelio-maps',
		'nelio_maps_options_page_html'
	);
}//end nelio_maps_options_page()
add_action( 'admin_menu', 'nelio_maps_options_page' );

/**
 * Callback to render Settings screen.
 *
 * @return void
 */
function nelio_maps_options_page_html() {
	include_once nelio_maps()->plugin_path . '/options-partial.php';
}//end nelio_maps_options_page_html()

/**
 * Callback to initialize settings.
 *
 * @return void
 */
function nelio_maps_settings_init() {

	register_setting( 'nelio_maps', 'nelio_maps_api_key_option' );

	add_settings_section(
		'nelio_maps_general',
		_x( 'General', 'text', 'nelio-maps' ),
		'__return_null',
		'nelio_maps'
	);

	add_settings_field(
		'nelio_maps_api_key_option',
		_x( 'Google API Key', 'text', 'nelio-maps' ),
		'nelio_maps_render_api_key_input_field',
		'nelio_maps',
		'nelio_maps_general'
	);
}//end nelio_maps_settings_init()
add_action( 'admin_init', 'nelio_maps_settings_init' );

/**
 * Callback to render API Key input field.
 *
 * @return void
 */
function nelio_maps_render_api_key_input_field() {

	$setting_name = 'nelio_maps_api_key_option';
	$option       = get_option( 'nelio_maps_api_key_option' );
	$option       = is_string( $option ) ? $option : '';

	printf(
		'<input type="text" name="%s" value="%s" size="60" /><p><span class="description">%s</span></p>',
		esc_attr( $setting_name ),
		esc_attr( $option ),
		wp_kses(
			str_replace(
				'<a>',
				sprintf( '<a href="%s" target="_blank">', esc_url( 'https://neliosoftware.com/blog/how-to-generate-an-api-key-for-google-translate/' ) ),
				_x( 'Please adhere to <a>these instructions</a> to generate the Google Maps API Key you’ll need to use Nelio Maps.', 'user', 'nelio-maps' ),
			),
			array(
				'a' => array(
					'href'   => true,
					'target' => true,
				),
			)
		)
	);
}//end nelio_maps_render_api_key_input_field()
