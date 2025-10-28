<?php
/**
 * Displays the UI for the Nelio Maps Page.
 */

defined( 'ABSPATH' ) || exit;

?>

<div class="wrap">

	<h1 class="wp-heading-inline"><?php echo esc_html_x( 'Nelio Maps - Settings', 'text', 'nelio-maps' ); ?></h1>

	<form action="options.php" method="post">

		<?php
		settings_fields( 'nelio_maps' );
		do_settings_sections( 'nelio_maps' );
		submit_button();
		?>

	</form>
</div>
