/**
 * Elevation Map Widget JavaScript v2.3.0
 * Uses Leaflet for maps + Chart.js for elevation charts
 * Features: Runner marker animation + Customizable colors + Auto-updates
 */

(function($) {
    'use strict';

    const ElevationMapWidget = {
        
        maps: {},
        charts: {},
        runners: {},
        runnerPulse: {},
        trackCoordinates: {},
        
        init: function() {
            this.initWidgets();
        },

        initWidgets: function() {
            $('.elevation-map-wrapper').each(function() {
                const $wrapper = $(this);
                const widgetId = $wrapper.attr('id');
                
                // Skip if already initialized
                if ($wrapper.data('initialized')) {
                    return;
                }
                
                $wrapper.data('initialized', true);
                
                // Get widget settings
                const trackUrl = $wrapper.data('track-url');
                const demEndpoint = $wrapper.data('dem-endpoint') || '/wp-json/juanchodatos/v1/dem';
                const mapRouteColor = $wrapper.data('map-route-color') || '#00a86b';
                const chartLineColor = $wrapper.data('chart-line-color') || '#00a86b';
                const chartFillColor = $wrapper.data('chart-fill-color') || 'rgba(0, 168, 107, 0.2)';
                const mapId = $wrapper.data('map-id');
                const elevationId = $wrapper.data('elevation-id');
                
                if (!trackUrl) {
                    console.warn('No track URL provided for widget:', widgetId);
                    return;
                }
                
                // Check if wrapper is visible
                if ($wrapper.is(':visible') && $wrapper.width() > 0) {
                    console.log('Widget visible, initializing immediately');
                    ElevationMapWidget.createMap($wrapper, {
                        trackUrl: trackUrl,
                        demEndpoint: demEndpoint,
                        mapRouteColor: mapRouteColor,
                        chartLineColor: chartLineColor,
                        chartFillColor: chartFillColor,
                        mapId: mapId,
                        elevationId: elevationId
                    });
                } else {
                    console.log('Widget not visible yet, waiting...');
                    // Use Intersection Observer to wait for visibility
                    if ('IntersectionObserver' in window) {
                        const observer = new IntersectionObserver(function(entries) {
                            entries.forEach(function(entry) {
                                if (entry.isIntersecting) {
                                    observer.disconnect();
                                    console.log('Widget now visible, initializing');
                                    ElevationMapWidget.createMap($wrapper, {
                                        trackUrl: trackUrl,
                                        demEndpoint: demEndpoint,
                                        mapRouteColor: mapRouteColor,
                                        chartLineColor: chartLineColor,
                                        chartFillColor: chartFillColor,
                                        mapId: mapId,
                                        elevationId: elevationId
                                    });
                                }
                            });
                        }, { threshold: 0.1 });
                        observer.observe($wrapper[0]);
                    } else {
                        // Fallback for browsers without IntersectionObserver
                        setTimeout(function() {
                            ElevationMapWidget.createMap($wrapper, {
                                trackUrl: trackUrl,
                                demEndpoint: demEndpoint,
                                mapRouteColor: mapRouteColor,
                                chartLineColor: chartLineColor,
                                chartFillColor: chartFillColor,
                                mapId: mapId,
                                elevationId: elevationId
                            });
                        }, 500);
                    }
                }
            });
        },

        createMap: function($wrapper, settings) {
            const self = this;
            const DEM_BATCH = 90;
            
            // Show loading
            const $loading = $wrapper.find('.elevation-loading');
            $loading.addClass('active');
            
            // Initialize map
            const mapElement = document.getElementById(settings.mapId);
            if (!mapElement) {
                console.error('Map element not found:', settings.mapId);
                $loading.removeClass('active');
                return;
            }
            
            // Ensure container has dimensions before creating map
            const container = document.getElementById(settings.mapId);
            if (container) {
                container.style.width = '100%';
                container.style.height = '350px';
                container.style.position = 'relative';
                container.style.display = 'block';
            }
            
            // Wait for container to be rendered
            setTimeout(function() {
                // Double check container visibility
                const containerCheck = document.getElementById(settings.mapId);
                if (!containerCheck || containerCheck.offsetWidth === 0) {
                    console.warn('Container not visible yet, retrying...');
                    setTimeout(arguments.callee, 100);
                    return;
                }
                
                console.log('Creating map for:', settings.mapId);
                
                try {
                    const map = L.map(settings.mapId, {
                        zoomControl: true,
                        scrollWheelZoom: true,
                        preferCanvas: true
                    }).setView([3.45, -76.56], 14);
                    
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© <a href="https://kromahost.com">Kroma Hosting</a>',
                        maxZoom: 19
                    }).addTo(map);
                    
                    // Store map instance
                    self.maps[settings.mapId] = map;
                    
                    console.log('Map created successfully');
                    
                    // Force size recalculation immediately
                    map.invalidateSize(true);
                    
                    // Continue with track loading
                    self.loadTrackData(map, settings, $wrapper, $loading);
                } catch(e) {
                    console.error('Error creating map:', e);
                    $loading.removeClass('active');
                }
            }, 200);
        },
        
        loadTrackData: function(map, settings, $wrapper, $loading) {
            const self = this;
            const DEM_BATCH = 90;
            
            // Load and process track
            self.loadAndProcessTrack(settings.trackUrl, settings.demEndpoint, DEM_BATCH)
                .then(geojson => {
                    console.log('Track loaded successfully');
                    
                    // Add route to map
                    const layer = L.geoJSON(geojson, {
                        style: {
                            color: settings.mapRouteColor,
                            weight: 4,
                            opacity: 0.8
                        }
                    }).addTo(map);
                    
                    // Fit bounds
                    try {
                        map.fitBounds(layer.getBounds(), { padding: [30, 30] });
                    } catch(e) {
                        console.warn('Could not fit bounds:', e);
                    }
                    
                    // Extract elevation data
                    const elevationData = self.extractElevationData(geojson);
                    console.log('Elevation data extracted:', elevationData);
                    
                    // Store coordinates for runner animation
                    self.trackCoordinates[settings.mapId] = [];
                    geojson.features.forEach(feature => {
                        if (feature.geometry && feature.geometry.type === 'LineString') {
                            self.trackCoordinates[settings.mapId] = feature.geometry.coordinates;
                        } else if (feature.geometry && feature.geometry.type === 'MultiLineString') {
                            self.trackCoordinates[settings.mapId] = feature.geometry.coordinates.flat();
                        }
                    });
                    
                    // Calculate statistics
                    const stats = self.calculateStats(elevationData);
                    console.log('Statistics calculated:', stats);
                    
                    // Display statistics with custom color
                    self.displayStats($wrapper, stats, settings);
                    
                    // Create runner marker
                    self.createRunnerMarker(settings.mapId);
                    
                    // Create elevation chart with Canvas - wait for DOM to be ready
                    setTimeout(function() {
                        self.createElevationChart(settings.elevationId, elevationData, settings.chartLineColor, settings.chartFillColor, settings.mapId);
                    }, 100);
                    
                    // Final resize - multiple attempts
                    setTimeout(function() {
                        map.invalidateSize(true);
                    }, 200);
                    
                    setTimeout(function() {
                        map.invalidateSize(true);
                    }, 500);
                    
                    setTimeout(function() {
                        map.invalidateSize(true);
                    }, 1000);
                    
                    setTimeout(function() {
                        map.invalidateSize(true);
                    }, 2000);
                    
                    // Hide loading
                    $loading.removeClass('active');
                })
                .catch(err => {
                    console.error('Error loading track:', err);
                    $loading.removeClass('active');
                    alert('Error al cargar el mapa: ' + err.message);
                });
        },

        extractElevationData: function(geojson) {
            const distances = [];
            const elevations = [];
            let totalDistance = 0;
            
            console.log('Extracting elevation data from GeoJSON:', geojson);
            
            (geojson.features || []).forEach(feature => {
                if (!feature.geometry) return;
                
                let coords = [];
                if (feature.geometry.type === 'LineString') {
                    coords = feature.geometry.coordinates;
                } else if (feature.geometry.type === 'MultiLineString') {
                    coords = feature.geometry.coordinates.flat();
                }
                
                console.log('Processing', coords.length, 'coordinates');
                
                coords.forEach((coord, i) => {
                    if (i > 0) {
                        const prev = coords[i - 1];
                        const dist = this.calculateDistance(
                            prev[1], prev[0], coord[1], coord[0]
                        );
                        totalDistance += dist;
                    }
                    
                    distances.push(totalDistance / 1000); // Convert to km
                    
                    // Try to get elevation from coordinate (z value)
                    let elevation = 0;
                    if (coord.length >= 3 && coord[2] !== null && coord[2] !== undefined) {
                        elevation = parseFloat(coord[2]);
                    }
                    elevations.push(elevation);
                    
                    // Log first few coordinates for debugging
                    if (i < 3) {
                        console.log('Coord', i, ':', coord, 'Elevation:', elevation);
                    }
                });
            });
            
            console.log('Extracted elevations:', elevations.slice(0, 10), '...');
            console.log('Total distance:', totalDistance / 1000, 'km');
            
            return { distances, elevations };
        },

        createElevationChart: function(chartId, data, lineColor, fillColor, mapId) {
            // Check if Chart.js is loaded
            if (typeof Chart === 'undefined') {
                console.error('Chart.js is not loaded');
                return;
            }
            
            const canvas = document.getElementById(chartId);
            if (!canvas) {
                console.error('Canvas not found:', chartId);
                return;
            }
            
            if (!(canvas instanceof HTMLCanvasElement)) {
                console.error('Element is not a canvas:', chartId, canvas);
                return;
            }
            
            // Destroy existing chart if any
            if (this.charts[chartId]) {
                this.charts[chartId].destroy();
            }
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error('Could not get 2d context from canvas');
                return;
            }
            
            const widget = this;
            console.log('Creating chart with runner for mapId:', mapId);
            
            this.charts[chartId] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.distances.map(d => d.toFixed(2)),
                    datasets: [{
                        label: 'Elevación (m)',
                        data: data.elevations,
                        borderColor: lineColor,
                        backgroundColor: fillColor,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    onHover: (event, activeElements) => {
                        if (activeElements && activeElements.length > 0) {
                            const index = activeElements[0].index;
                            console.log('Hover at index:', index, 'for mapId:', mapId);
                            widget.updateRunnerPosition(mapId, index);
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    return 'Distancia: ' + context[0].label + ' km';
                                },
                                label: function(context) {
                                    return 'Elevación: ' + context.parsed.y.toFixed(2) + ' m';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Distancia (km)',
                                font: {
                                    size: 12,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                maxTicksLimit: 10,
                                font: {
                                    size: 11
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Elevación (m)',
                                font: {
                                    size: 12,
                                    weight: 'bold'
                                }
                            },
                            beginAtZero: false,
                            ticks: {
                                font: {
                                    size: 11
                                }
                            }
                        }
                    }
                }
            });
            
            // Agregar evento para ocultar runner cuando el mouse sale del gráfico
            canvas.addEventListener('mouseleave', function() {
                if (widget.runners[mapId]) {
                    widget.runners[mapId].setStyle({ fillOpacity: 0, opacity: 0 });
                }
                if (widget.runnerPulse[mapId]) {
                    widget.runnerPulse[mapId].setStyle({ opacity: 0 });
                }
            });
            
            console.log('Chart created successfully');
        },

        calculateStats: function(data) {
            // Filter out zeros and invalid values
            const validElevations = data.elevations.filter(e => e > 0 && Number.isFinite(e));
            const maxDistance = data.distances[data.distances.length - 1] || 0;
            
            console.log('Calculating stats. Total elevations:', data.elevations.length, 'Valid elevations:', validElevations.length);
            
            if (validElevations.length === 0) {
                console.warn('No valid elevation data found. All values are 0 or invalid.');
            }
            
            return {
                distance: maxDistance.toFixed(2),
                minElevation: validElevations.length > 0 ? Math.min(...validElevations).toFixed(2) : '0.00',
                maxElevation: validElevations.length > 0 ? Math.max(...validElevations).toFixed(2) : '0.00',
                avgElevation: validElevations.length > 0 
                    ? (validElevations.reduce((a, b) => a + b, 0) / validElevations.length).toFixed(2)
                    : '0.00',
                elevationGain: validElevations.length > 0 ? this.calculateElevationGain(data.elevations).toFixed(2) : '0.00'
            };
        },

        calculateElevationGain: function(elevations) {
            let gain = 0;
            for (let i = 1; i < elevations.length; i++) {
                const diff = elevations[i] - elevations[i - 1];
                if (diff > 0) {
                    gain += diff;
                }
            }
            return gain;
        },

        displayStats: function($wrapper, stats, settings) {
            // Get measurement color from wrapper data attribute or use default
            const measurementColor = $wrapper.data('measurement-color') || '#00a86b';
            
            const html = `
                <div class="stat-item">
                    <span class="stat-icon">📏</span>
                    <span class="stat-label">Distancia Total:</span>
                    <span class="stat-value" style="color: ${measurementColor} !important;">${stats.distance} km</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">⬇️</span>
                    <span class="stat-label">Elevación Mínima:</span>
                    <span class="stat-value" style="color: ${measurementColor} !important;">${stats.minElevation} m</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">⬆️</span>
                    <span class="stat-label">Elevación Máxima:</span>
                    <span class="stat-value" style="color: ${measurementColor} !important;">${stats.maxElevation} m</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">📊</span>
                    <span class="stat-label">Elevación Promedio:</span>
                    <span class="stat-value" style="color: ${measurementColor} !important;">${stats.avgElevation} m</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">⛰️</span>
                    <span class="stat-label">Desnivel Positivo:</span>
                    <span class="stat-value" style="color: ${measurementColor} !important;">${stats.elevationGain} m</span>
                </div>
            `;
            
            let $summary = $wrapper.find('.custom-elevation-summary');
            if ($summary.length === 0) {
                $summary = $('<div class="custom-elevation-summary"></div>');
                $wrapper.find('.elevation-map-container-wrapper').append($summary);
            }
            
            $summary.html(html);
        },

        loadAndProcessTrack: async function(trackUrl, demEndpoint, demBatch) {
            let geojson = await this.loadAsGeoJSON(trackUrl);
            geojson = this.removeDuplicateSegments(geojson);
            geojson = await this.enrichWithElevation(geojson, demEndpoint, demBatch);
            return geojson;
        },

        loadAsGeoJSON: async function(url) {
            const ext = url.split('?')[0].split('#')[0].split('.').pop().toLowerCase();
            
            if (ext === 'gpx') {
                const txt = await this.fetchText(url);
                return toGeoJSON.gpx(new DOMParser().parseFromString(txt, 'application/xml'));
            }
            
            if (ext === 'kml') {
                const txt = await this.fetchText(url);
                return toGeoJSON.kml(new DOMParser().parseFromString(txt, 'application/xml'));
            }
            
            if (ext === 'kmz') {
                const ab = await this.fetchArrayBuffer(url);
                const zip = await JSZip.loadAsync(ab);
                const kmlEntry = Object.values(zip.files).find(f => f.name.toLowerCase().endsWith('.kml'));
                
                if (!kmlEntry) throw new Error('KMZ sin archivo .kml interno');
                
                const kmlTxt = await kmlEntry.async('string');
                return toGeoJSON.kml(new DOMParser().parseFromString(kmlTxt, 'application/xml'));
            }
            
            throw new Error('Extensión no soportada: ' + ext);
        },

        fetchText: async function(url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        },

        fetchArrayBuffer: async function(url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.arrayBuffer();
        },

        removeDuplicateSegments: function(geojson) {
            const lines = (geojson.features || []).filter(f => 
                f.geometry && ['LineString', 'MultiLineString'].includes(f.geometry.type)
            );
            
            if (lines.length <= 1) return geojson;
            
            const segments = [];
            
            lines.forEach((feature, index) => {
                const geom = feature.geometry;
                
                if (geom.type === 'LineString') {
                    const length = this.calculateSegmentLength(geom.coordinates);
                    segments.push({
                        coordinates: geom.coordinates,
                        properties: feature.properties,
                        length: length,
                        originalIndex: index
                    });
                } else if (geom.type === 'MultiLineString') {
                    geom.coordinates.forEach((lineCoords) => {
                        const length = this.calculateSegmentLength(lineCoords);
                        segments.push({
                            coordinates: lineCoords,
                            properties: feature.properties,
                            length: length,
                            originalIndex: index
                        });
                    });
                }
            });
            
            segments.sort((a, b) => b.length - a.length);
            const longestSegment = segments[0];
            
            geojson.features = [{
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: longestSegment.coordinates
                },
                properties: longestSegment.properties || {}
            }];
            
            return geojson;
        },

        calculateSegmentLength: function(coords) {
            let length = 0;
            for (let i = 1; i < coords.length; i++) {
                const prev = coords[i - 1];
                const curr = coords[i];
                length += this.calculateDistance(prev[1], prev[0], curr[1], curr[0]);
            }
            return length;
        },

        enrichWithElevation: async function(geojson, demEndpoint, demBatch) {
            console.log('Enriching with elevation data from:', demEndpoint);
            
            const lines = (geojson.features || []).filter(f => 
                f.geometry && ['LineString', 'MultiLineString'].includes(f.geometry.type)
            );
            
            if (!lines.length) {
                console.warn('No line features found in GeoJSON');
                return geojson;
            }
            
            const coords = [];
            
            lines.forEach(f => {
                const g = f.geometry;
                if (g.type === 'LineString') {
                    g.coordinates.forEach(c => coords.push([c[1], c[0]]));
                } else {
                    g.coordinates.forEach(line => {
                        line.forEach(c => coords.push([c[1], c[0]]));
                    });
                }
            });
            
            console.log('Total coordinates to enrich:', coords.length);
            
            const elevations = [];
            let successfulBatches = 0;
            let failedBatches = 0;
            
            for (let i = 0; i < coords.length; i += demBatch) {
                const batch = coords.slice(i, i + demBatch)
                    .map(p => `${p[0]},${p[1]}`)
                    .join('|');
                
                const url = `${demEndpoint}?locations=${encodeURIComponent(batch)}`;
                
                try {
                    console.log('Fetching batch', Math.floor(i/demBatch) + 1, 'from DEM endpoint...');
                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        throw new Error('DEM fetch failed: ' + response.status);
                    }
                    
                    const data = await response.json();
                    console.log('DEM response:', data);
                    
                    if (data.results && Array.isArray(data.results)) {
                        data.results.forEach(r => {
                            const elev = Number.isFinite(r.elevation) ? r.elevation : 0;
                            elevations.push(elev);
                        });
                        successfulBatches++;
                    } else {
                        console.error('Invalid DEM response format:', data);
                        for (let j = 0; j < Math.min(demBatch, coords.length - i); j++) {
                            elevations.push(0);
                        }
                        failedBatches++;
                    }
                    
                    await this.wait(120);
                } catch (error) {
                    console.error('Error fetching elevation data:', error);
                    failedBatches++;
                    for (let j = 0; j < Math.min(demBatch, coords.length - i); j++) {
                        elevations.push(0);
                    }
                }
            }
            
            console.log('Elevation enrichment complete. Success:', successfulBatches, 'Failed:', failedBatches);
            console.log('Sample elevations:', elevations.slice(0, 10));
            
            let k = 0;
            lines.forEach(f => {
                const g = f.geometry;
                if (g.type === 'LineString') {
                    g.coordinates = g.coordinates.map(c => [c[0], c[1], elevations[k++] ?? 0]);
                } else {
                    g.coordinates = g.coordinates.map(line =>
                        line.map(c => [c[0], c[1], elevations[k++] ?? 0])
                    );
                }
            });
            
            return geojson;
        },

        calculateDistance: function(lat1, lon1, lat2, lon2) {
            const R = 6371000;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        },

        hexToRgba: function(hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        },

        wait: function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        
        createRunnerMarker: function(mapId) {
            console.log('Creating runner marker for mapId:', mapId);
            console.log('Map exists:', !!this.maps[mapId]);
            console.log('Track coordinates exist:', !!this.trackCoordinates[mapId]);
            
            if (!this.maps[mapId]) {
                console.error('Map not found for mapId:', mapId);
                return;
            }
            
            const map = this.maps[mapId];
            
            // Crear o asegurar que existe el pane para el runner
            if (!map.getPane('runnerPane')) {
                map.createPane('runnerPane');
                map.getPane('runnerPane').style.zIndex = 650;
            }
            
            // Usar CircleMarker simple y visible (siempre funciona)
            this.runners[mapId] = L.circleMarker([0, 0], {
                radius: 12,
                fillColor: '#ff3838',
                color: '#ffffff',
                weight: 3,
                opacity: 0,
                fillOpacity: 0,
                pane: 'runnerPane',
                interactive: false
            }).addTo(map);
            
            // Añadir efecto de pulso con otro círculo más grande
            this.runnerPulse = this.runnerPulse || {};
            this.runnerPulse[mapId] = L.circleMarker([0, 0], {
                radius: 18,
                fillColor: 'transparent',
                color: '#ff3838',
                weight: 2,
                opacity: 0,
                fillOpacity: 0,
                pane: 'runnerPane',
                interactive: false,
                className: 'runner-pulse'
            }).addTo(map);
            
            console.log('Runner marker created and added to map:', mapId);
            console.log('Runner object:', this.runners[mapId]);
            
            // Agregar animación CSS para el pulso
            if (!document.getElementById('runner-animation-styles')) {
                const style = document.createElement('style');
                style.id = 'runner-animation-styles';
                style.textContent = `
                    @keyframes runner-pulse-animation {
                        0% { 
                            transform: scale(1);
                            opacity: 0.5;
                        }
                        50% { 
                            transform: scale(1.3);
                            opacity: 0.2;
                        }
                        100% { 
                            transform: scale(1);
                            opacity: 0.5;
                        }
                    }
                    .leaflet-pane.leaflet-runnerPane {
                        z-index: 650 !important;
                        pointer-events: none !important;
                    }
                    .leaflet-runnerPane path.runner-pulse {
                        animation: runner-pulse-animation 1.5s ease-in-out infinite;
                        transform-origin: center center;
                    }
                `;
                document.head.appendChild(style);
            }
        },
        
        updateRunnerPosition: function(mapId, index) {
            console.log('Updating runner position. MapId:', mapId, 'Index:', index);
            console.log('Runner exists:', !!this.runners[mapId]);
            console.log('Coords exist:', !!this.trackCoordinates[mapId]);
            
            if (!this.runners[mapId] || !this.trackCoordinates[mapId]) {
                console.error('Runner or coordinates not found');
                return;
            }
            
            const coords = this.trackCoordinates[mapId];
            console.log('Total coordinates:', coords.length);
            
            if (index < 0 || index >= coords.length) {
                console.warn('Index out of bounds:', index, 'of', coords.length);
                return;
            }
            
            const coord = coords[index];
            console.log('Coordinate at index', index, ':', coord);
            const latLng = L.latLng(coord[1], coord[0]);
            console.log('LatLng:', latLng);
            
            // Actualizar posición del corredor principal
            this.runners[mapId].setLatLng(latLng);
            this.runners[mapId].setStyle({ fillOpacity: 0.9, opacity: 1 });
            
            // Actualizar círculo de pulso
            if (this.runnerPulse[mapId]) {
                this.runnerPulse[mapId].setLatLng(latLng);
                this.runnerPulse[mapId].setStyle({ opacity: 0.5 });
            }
            
            console.log('Runner position updated and made visible');
            
            // Centrar mapa suavemente en el corredor (opcional)
            // Descomenta si quieres que el mapa siga al corredor
            // this.maps[mapId].panTo(latLng, {
            //     animate: true,
            //     duration: 0.3
            // });
        }
    };

    // Wait for all libraries to load
    function waitForLibraries(callback) {
        var checkInterval = setInterval(function() {
            if (typeof L !== 'undefined' && 
                typeof Chart !== 'undefined' && 
                typeof toGeoJSON !== 'undefined' && 
                typeof JSZip !== 'undefined') {
                clearInterval(checkInterval);
                callback();
            }
        }, 100);
        
        // Timeout after 10 seconds
        setTimeout(function() {
            clearInterval(checkInterval);
            if (typeof L !== 'undefined') {
                callback();
            }
        }, 10000);
    }

    // Initialize on document ready
    $(document).ready(function() {
        waitForLibraries(function() {
            console.log('All libraries loaded, initializing widget');
            ElevationMapWidget.init();
        });
    });

    // Initialize for Elementor
    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/elevation_map.default', function($scope) {
            waitForLibraries(function() {
                ElevationMapWidget.init();
            });
        });
    });

})(jQuery);
