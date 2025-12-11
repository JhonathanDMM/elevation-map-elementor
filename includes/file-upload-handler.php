<?php
/**
 * Plugin Name: Elevation Map Elementor Widget
 * Plugin URI: https://kromahosting.com
 * Description: Widget de Elementor para mostrar mapas con análisis de altimetría (GPX/KML/KMZ). Incluye efectos glass morphism y diseño moderno personalizable.
 * Version: 1.0.0
 * Author: Kroma Hosting
 * Author URI: https://kromahosting.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: elevation-map-elementor
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Elementor tested up to: 3.25
 * Elementor Pro tested up to: 3.25
 */

if (!defined('ABSPATH')) {
    exit;
}

// Allow additional file types in media upload
add_filter('upload_mimes', 'elevation_map_add_custom_mime_types');
function elevation_map_add_custom_mime_types($mimes) {
    $mimes['gpx'] = 'application/gpx+xml';
    $mimes['kml'] = 'application/vnd.google-earth.kml+xml';
    $mimes['kmz'] = 'application/vnd.google-earth.kmz';
    return $mimes;
}

// Check file types for security
add_filter('wp_check_filetype_and_ext', 'elevation_map_check_file_type_and_ext', 10, 4);
function elevation_map_check_file_type_and_ext($data, $file, $filename, $mimes) {
    $filetype = wp_check_filetype($filename, $mimes);
    
    if (in_array($filetype['ext'], ['gpx', 'kml', 'kmz'])) {
        $data['ext'] = $filetype['ext'];
        $data['type'] = $filetype['type'];
    }
    
    return $data;
}
