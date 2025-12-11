<?php
/**
 * DEM API Endpoint
 * Obtiene elevaciones usando Open-Elevation API
 */

if (!defined('ABSPATH')) {
    exit;
}

class Elevation_Map_DEM_API {
    
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }
    
    public function register_routes() {
        register_rest_route('juanchodatos/v1', '/dem', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_elevations'),
            'permission_callback' => '__return_true',
            'args' => array(
                'locations' => array(
                    'required' => true,
                    'type' => 'string',
                    'description' => 'Coordenadas separadas por pipe: lat,lon|lat,lon'
                )
            )
        ));
    }
    
    public function get_elevations($request) {
        $locations = $request->get_param('locations');
        
        if (empty($locations)) {
            return new WP_Error('missing_locations', 'Se requiere el parámetro locations', array('status' => 400));
        }
        
        // Parse coordinates
        $coords = explode('|', $locations);
        $locations_array = array();
        
        foreach ($coords as $coord) {
            $parts = explode(',', trim($coord));
            if (count($parts) === 2) {
                $locations_array[] = array(
                    'latitude' => floatval($parts[0]),
                    'longitude' => floatval($parts[1])
                );
            }
        }
        
        if (empty($locations_array)) {
            return new WP_Error('invalid_locations', 'Formato de coordenadas inválido', array('status' => 400));
        }
        
        // Usar Open-Elevation API (gratis y sin límites)
        $api_url = 'https://api.open-elevation.com/api/v1/lookup';
        
        $response = wp_remote_post($api_url, array(
            'headers' => array('Content-Type' => 'application/json'),
            'body' => json_encode(array('locations' => $locations_array)),
            'timeout' => 30
        ));
        
        if (is_wp_error($response)) {
            return new WP_Error('api_error', $response->get_error_message(), array('status' => 500));
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (!isset($data['results'])) {
            return new WP_Error('invalid_response', 'Respuesta inválida de la API de elevación', array('status' => 500));
        }
        
        // Formatear respuesta
        return array(
            'results' => $data['results']
        );
    }
}

// Inicializar
new Elevation_Map_DEM_API();
