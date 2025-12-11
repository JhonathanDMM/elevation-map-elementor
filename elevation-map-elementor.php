<?php
/**
 * Plugin Name: Elevation Map Elementor Widget
 * Plugin URI: https://kromahost.com
 * Description: Widget de Elementor para mostrar mapas con analisis de altimetria (GPX/KML/KMZ). Incluye efectos glass morphism y diseno moderno personalizable.
 * Version: 2.3.0
 * Author: Kroma Hosting
 * Author URI: https://kromahost.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: elevation-map-elementor
 * Domain Path: /languages
 * Requires at least: 6.0
 * Tested up to: 6.7
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('ELEVATION_MAP_VERSION', '2.3.0');
define('ELEVATION_MAP_PATH', plugin_dir_path(__FILE__));
define('ELEVATION_MAP_URL', plugin_dir_url(__FILE__));

/**
 * Main Elevation Map Elementor Class
 */
final class Elevation_Map_Elementor {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('plugins_loaded', [$this, 'init']);
        
        // Include file upload handler
        require_once ELEVATION_MAP_PATH . 'includes/file-upload-handler.php';
        
        // Include DEM API
        require_once ELEVATION_MAP_PATH . 'includes/dem-api.php';
        
        // Initialize Auto-Update from GitHub
        $this->init_auto_update();
    }
    
    /**
     * Initialize Plugin Update Checker for GitHub releases
     */
    public function init_auto_update() {
        // Include Plugin Update Checker library
        require_once ELEVATION_MAP_PATH . 'lib/plugin-update-checker/plugin-update-checker.php';
        
        use YahnisElsts\PluginUpdateChecker\v5\PucFactory;
        
        $myUpdateChecker = PucFactory::buildUpdateChecker(
            'https://github.com/TU_USUARIO/elevation-map-elementor/', // IMPORTANTE: Reemplaza TU_USUARIO con tu usuario de GitHub
            __FILE__,
            'elevation-map-elementor'
        );
        
        // Optional: Set the branch for updates (default is 'master' or 'main')
        $myUpdateChecker->setBranch('main');
        
        // Optional: Enable release assets (recommended for distributing ZIPs)
        $myUpdateChecker->getVcsApi()->enableReleaseAssets();
    }

    public function init() {
        // Check if Elementor is installed and activated
        if (!did_action('elementor/loaded')) {
            add_action('admin_notices', [$this, 'admin_notice_missing_elementor']);
            return;
        }

        // Check for required Elementor version
        if (!version_compare(ELEMENTOR_VERSION, '3.0.0', '>=')) {
            add_action('admin_notices', [$this, 'admin_notice_minimum_elementor_version']);
            return;
        }

        // Register Widget
        add_action('elementor/widgets/register', [$this, 'register_widgets']);

        // Register Widget Category
        add_action('elementor/elements/categories_registered', [$this, 'add_elementor_widget_categories']);

        // Enqueue Scripts and Styles
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('elementor/frontend/after_enqueue_styles', [$this, 'widget_styles']);
        add_action('elementor/frontend/after_register_scripts', [$this, 'widget_scripts']);
        
        // Load plugin textdomain
        add_action('init', [$this, 'i18n']);
    }

    /**
     * Load Textdomain
     */
    public function i18n() {
        load_plugin_textdomain('elevation-map-elementor', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }

    /**
     * Admin notice for missing Elementor
     */
    public function admin_notice_missing_elementor() {
        if (isset($_GET['activate'])) unset($_GET['activate']);
        $message = sprintf(
            esc_html__('"%1$s" requiere que "%2$s" esté instalado y activado.', 'elevation-map-elementor'),
            '<strong>' . esc_html__('Elevation Map Elementor Widget', 'elevation-map-elementor') . '</strong>',
            '<strong>' . esc_html__('Elementor', 'elevation-map-elementor') . '</strong>'
        );
        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }

    /**
     * Admin notice for minimum Elementor version
     */
    public function admin_notice_minimum_elementor_version() {
        if (isset($_GET['activate'])) unset($_GET['activate']);
        $message = sprintf(
            esc_html__('"%1$s" requiere "%2$s" versión %3$s o superior.', 'elevation-map-elementor'),
            '<strong>' . esc_html__('Elevation Map Elementor Widget', 'elevation-map-elementor') . '</strong>',
            '<strong>' . esc_html__('Elementor', 'elevation-map-elementor') . '</strong>',
            '3.0.0'
        );
        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }

    /**
     * Register Widgets
     */
    public function register_widgets($widgets_manager) {
        require_once ELEVATION_MAP_PATH . 'widgets/elevation-map-widget.php';
        $widgets_manager->register(new \Elevation_Map_Widget());
    }

    /**
     * Add Widget Categories
     */
    public function add_elementor_widget_categories($elements_manager) {
        $elements_manager->add_category(
            'kroma-maps',
            [
                'title' => esc_html__('Kroma Maps', 'elevation-map-elementor'),
                'icon' => 'fa fa-map',
            ]
        );
    }

    /**
     * Enqueue Scripts
     */
    public function enqueue_scripts() {
        // Leaflet CSS
        wp_register_style(
            'leaflet',
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
            [],
            '1.9.4'
        );

        // Leaflet JS
        wp_register_script(
            'leaflet',
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
            [],
            '1.9.4',
            true
        );

        // Chart.js for elevation charts
        wp_register_script(
            'chartjs',
            'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
            [],
            '4.4.1',
            true
        );

        // ToGeoJSON
        wp_register_script(
            'togeojson',
            'https://unpkg.com/@tmcw/togeojson@4.3.0/dist/togeojson.umd.js',
            [],
            '4.3.0',
            true
        );

        // JSZip
        wp_register_script(
            'jszip',
            'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js',
            [],
            '3.10.1',
            true
        );
    }

    /**
     * Widget Styles
     */
    public function widget_styles() {
        wp_enqueue_style(
            'elevation-map-widget',
            ELEVATION_MAP_URL . 'assets/css/elevation-map-widget.css',
            ['leaflet'],
            ELEVATION_MAP_VERSION
        );
    }

    /**
     * Widget Scripts
     */
    public function widget_scripts() {
        wp_enqueue_script(
            'elevation-map-widget',
            ELEVATION_MAP_URL . 'assets/js/elevation-map-widget.js',
            ['jquery', 'leaflet', 'chartjs', 'togeojson', 'jszip'],
            ELEVATION_MAP_VERSION,
            true
        );
    }
}

Elevation_Map_Elementor::instance();
