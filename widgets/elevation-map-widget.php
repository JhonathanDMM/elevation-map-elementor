<?php
/**
 * Elevation Map Widget
 */

if (!defined('ABSPATH')) {
    exit;
}

class Elevation_Map_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'elevation_map';
    }

    public function get_title() {
        return esc_html__('Mapa de Altimetría', 'elevation-map-elementor');
    }

    public function get_icon() {
        return 'eicon-google-maps';
    }

    public function get_categories() {
        return ['kroma-maps'];
    }

    public function get_keywords() {
        return ['map', 'mapa', 'elevation', 'altimetria', 'gpx', 'kml', 'kmz', 'route', 'ruta'];
    }

    public function get_style_depends() {
        return ['leaflet', 'leaflet-elevation', 'elevation-map-widget'];
    }

    public function get_script_depends() {
        return ['leaflet', 'leaflet-elevation', 'togeojson', 'jszip', 'elevation-map-widget'];
    }

    protected function register_controls() {

        // ========== CONTENT TAB ==========
        
        // Section: Map File
        $this->start_controls_section(
            'section_map_file',
            [
                'label' => esc_html__('Archivo del Mapa', 'elevation-map-elementor'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'file_source',
            [
                'label' => esc_html__('Fuente del Archivo', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::SELECT,
                'default' => 'upload',
                'options' => [
                    'upload' => esc_html__('Subir Archivo', 'elevation-map-elementor'),
                    'url' => esc_html__('URL Externa', 'elevation-map-elementor'),
                ],
            ]
        );

        $this->add_control(
            'track_file',
            [
                'label' => esc_html__('Archivo de Ruta', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::MEDIA,
                'media_types' => ['application/gpx+xml', 'application/vnd.google-earth.kml+xml', 'application/vnd.google-earth.kmz'],
                'default' => [
                    'url' => '',
                ],
                'condition' => [
                    'file_source' => 'upload',
                ],
                'description' => esc_html__('Sube un archivo GPX, KML o KMZ', 'elevation-map-elementor'),
            ]
        );

        $this->add_control(
            'track_url',
            [
                'label' => esc_html__('URL del Archivo', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::URL,
                'placeholder' => 'https://example.com/ruta.gpx',
                'condition' => [
                    'file_source' => 'url',
                ],
                'description' => esc_html__('Ingresa la URL de un archivo GPX, KML o KMZ', 'elevation-map-elementor'),
            ]
        );

        $this->add_control(
            'dem_endpoint',
            [
                'label' => esc_html__('Endpoint DEM', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => '/wp-json/juanchodatos/v1/dem',
                'description' => esc_html__('Endpoint para obtener datos de elevación', 'elevation-map-elementor'),
            ]
        );

        $this->end_controls_section();

        // Section: Map Settings
        $this->start_controls_section(
            'section_map_settings',
            [
                'label' => esc_html__('Configuración del Mapa', 'elevation-map-elementor'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'map_height',
            [
                'label' => esc_html__('Altura del Mapa', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::SLIDER,
                'size_units' => ['px', 'vh'],
                'range' => [
                    'px' => [
                        'min' => 200,
                        'max' => 800,
                        'step' => 10,
                    ],
                    'vh' => [
                        'min' => 20,
                        'max' => 100,
                        'step' => 5,
                    ],
                ],
                'default' => [
                    'unit' => 'px',
                    'size' => 350,
                ],
                'selectors' => [
                    '{{WRAPPER}} .elevation-map-container' => 'height: {{SIZE}}{{UNIT}}; min-height: 250px;',
                ],
            ]
        );

        $this->add_control(
            'elevation_height',
            [
                'label' => esc_html__('Altura del Gráfico', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::SLIDER,
                'size_units' => ['px'],
                'range' => [
                    'px' => [
                        'min' => 100,
                        'max' => 400,
                        'step' => 10,
                    ],
                ],
                'default' => [
                    'unit' => 'px',
                    'size' => 180,
                ],
                'selectors' => [
                    '{{WRAPPER}} .elevation-chart-container' => 'height: {{SIZE}}{{UNIT}}; min-height: 150px;',
                ],
            ]
        );

        $this->add_control(
            'show_header',
            [
                'label' => esc_html__('Mostrar Encabezado', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Sí', 'elevation-map-elementor'),
                'label_off' => esc_html__('No', 'elevation-map-elementor'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'header_title',
            [
                'label' => esc_html__('Título', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => '🏃‍♂️ Ruta 10K Cauca',
                'condition' => [
                    'show_header' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'header_subtitle',
            [
                'label' => esc_html__('Subtítulo', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => 'Análisis de altimetría y perfil de elevación',
                'condition' => [
                    'show_header' => 'yes',
                ],
            ]
        );

        $this->end_controls_section();

        // ========== STYLE TAB ==========

        // Section: Colors
        $this->start_controls_section(
            'section_style_colors',
            [
                'label' => esc_html__('Colores', 'elevation-map-elementor'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'map_route_color',
            [
                'label' => esc_html__('Trazado del Mapa', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#00a86b',
                'description' => esc_html__('Color de la línea de la ruta en el mapa', 'elevation-map-elementor'),
            ]
        );

        $this->add_control(
            'chart_line_color',
            [
                'label' => esc_html__('Línea de Altimetría', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#00a86b',
                'description' => esc_html__('Color de la línea en el gráfico de elevación', 'elevation-map-elementor'),
            ]
        );

        $this->add_control(
            'chart_fill_color',
            [
                'label' => esc_html__('Relleno de Altimetría', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => 'rgba(0, 168, 107, 0.2)',
                'description' => esc_html__('Color de relleno bajo la línea de elevación', 'elevation-map-elementor'),
            ]
        );

        $this->add_control(
            'info_text_color',
            [
                'label' => esc_html__('Textos de Información', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#333333',
                'selectors' => [
                    '{{WRAPPER}} .custom-elevation-summary > div' => 'color: {{VALUE}} !important;',
                ],
                'description' => esc_html__('Color de los textos en las tarjetas de información', 'elevation-map-elementor'),
            ]
        );

        $this->add_control(
            'measurement_color',
            [
                'label' => esc_html__('Color de Medidas', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#00a86b',
                'selectors' => [
                    '{{WRAPPER}} .custom-elevation-summary strong' => 'color: {{VALUE}} !important;',
                    '{{WRAPPER}} .custom-elevation-summary > div' => 'border-left-color: {{VALUE}};',
                ],
                'description' => esc_html__('Color de los valores numéricos y resaltados', 'elevation-map-elementor'),
            ]
        );

        $this->add_control(
            'card_background',
            [
                'label' => esc_html__('Fondo de Tarjetas', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .glass-card' => 'background: {{VALUE}};',
                    '{{WRAPPER}} .elevation-card' => 'background: {{VALUE}};',
                    '{{WRAPPER}} .custom-elevation-summary' => 'background: {{VALUE}};',
                ],
                'description' => esc_html__('Color de fondo de las tarjetas del mapa y gráficos', 'elevation-map-elementor'),
            ]
        );

        $this->add_control(
            'border_radius',
            [
                'label' => esc_html__('Radio de Borde', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::SLIDER,
                'size_units' => ['px'],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 16,
                ],
                'selectors' => [
                    '{{WRAPPER}} .glass-card' => 'border-radius: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .elevation-card' => 'border-radius: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .custom-elevation-summary' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Section: Typography
        $this->start_controls_section(
            'section_style_typography',
            [
                'label' => esc_html__('Tipografía', 'elevation-map-elementor'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_group_control(
            \Elementor\Group_Control_Typography::get_type(),
            [
                'name' => 'title_typography',
                'label' => esc_html__('Título', 'elevation-map-elementor'),
                'selector' => '{{WRAPPER}} .header h1',
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label' => esc_html__('Color del Título', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .header h1' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            \Elementor\Group_Control_Typography::get_type(),
            [
                'name' => 'subtitle_typography',
                'label' => esc_html__('Subtítulo', 'elevation-map-elementor'),
                'selector' => '{{WRAPPER}} .header p',
            ]
        );

        $this->add_control(
            'subtitle_color',
            [
                'label' => esc_html__('Color del Subtítulo', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => 'rgba(255, 255, 255, 0.9)',
                'selectors' => [
                    '{{WRAPPER}} .header p' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            \Elementor\Group_Control_Typography::get_type(),
            [
                'name' => 'summary_typography',
                'label' => esc_html__('Resumen', 'elevation-map-elementor'),
                'selector' => '{{WRAPPER}} .custom-elevation-summary > div',
            ]
        );

        $this->add_control(
            'summary_color',
            [
                'label' => esc_html__('Color del Resumen', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .custom-elevation-summary > div' => 'color: {{VALUE}} !important;',
                ],
            ]
        );

        $this->add_control(
            'summary_highlight_color',
            [
                'label' => esc_html__('Color de Resaltado', 'elevation-map-elementor'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#4ade80',
                'selectors' => [
                    '{{WRAPPER}} .custom-elevation-summary strong' => 'color: {{VALUE}} !important;',
                    '{{WRAPPER}} .custom-elevation-summary > div' => 'border-left-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        
        // Get track URL
        $track_url = '';
        if ($settings['file_source'] === 'upload' && !empty($settings['track_file']['url'])) {
            $track_url = $settings['track_file']['url'];
        } elseif ($settings['file_source'] === 'url' && !empty($settings['track_url']['url'])) {
            $track_url = $settings['track_url']['url'];
        }

        // Generate unique ID
        $widget_id = 'elevation-map-' . $this->get_id();
        $map_id = 'map-' . $this->get_id();
        $elevation_id = 'elevation-' . $this->get_id();

        // Output widget data attributes for JS
        $data_attrs = [
            'data-track-url' => esc_attr($track_url),
            'data-dem-endpoint' => esc_attr($settings['dem_endpoint']),
            'data-map-route-color' => esc_attr($settings['map_route_color'] ?? '#00a86b'),
            'data-chart-line-color' => esc_attr($settings['chart_line_color'] ?? '#00a86b'),
            'data-chart-fill-color' => esc_attr($settings['chart_fill_color'] ?? 'rgba(0, 168, 107, 0.2)'),
            'data-measurement-color' => esc_attr($settings['measurement_color'] ?? '#00a86b'),
            'data-map-id' => esc_attr($map_id),
            'data-elevation-id' => esc_attr($elevation_id),
        ];
        ?>
        <div class="elevation-map-wrapper" id="<?php echo esc_attr($widget_id); ?>" <?php echo implode(' ', array_map(function($k, $v) { return "$k=\"$v\""; }, array_keys($data_attrs), $data_attrs)); ?>>
            <div class="elevation-map-container-wrapper">
                <?php if ($settings['show_header'] === 'yes') : ?>
                <div class="header">
                    <h1><?php echo esc_html($settings['header_title']); ?></h1>
                    <p><?php echo esc_html($settings['header_subtitle']); ?></p>
                </div>
                <?php endif; ?>

                <div class="glass-card">
                    <div class="elevation-map-container" id="<?php echo esc_attr($map_id); ?>"></div>
                </div>

                <div class="elevation-card">
                    <div class="elevation-chart-container">
                        <canvas id="<?php echo esc_attr($elevation_id); ?>"></canvas>
                    </div>
                </div>

                <div class="elevation-loading">
                    <div class="spinner"></div>
                </div>
            </div>
        </div>
        <?php
    }

    protected function content_template() {
        ?>
        <#
        var widgetId = 'elevation-map-' + view.getID();
        var mapId = 'map-' + view.getID();
        var elevationId = 'elevation-' + view.getID();
        var trackUrl = settings.file_source === 'upload' ? settings.track_file.url : settings.track_url.url;
        #>
        <div class="elevation-map-wrapper" id="{{ widgetId }}">
            <div class="elevation-map-container-wrapper">
                <# if (settings.show_header === 'yes') { #>
                <div class="header">
                    <h1>{{{ settings.header_title }}}</h1>
                    <p>{{{ settings.header_subtitle }}}</p>
                </div>
                <# } #>

                <div class="glass-card">
                    <div class="elevation-map-container" id="{{ mapId }}"></div>
                </div>

                <div class="elevation-card">
                    <div class="elevation-chart-container" id="{{ elevationId }}"></div>
                </div>

                <div class="elevation-preview-notice">
                    <p>⚠️ Vista previa del mapa. Los datos se cargarán en la página publicada.</p>
                </div>
            </div>
        </div>
        <?php
    }
}
