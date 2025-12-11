# Changelog - Elevation Map Elementor Widget

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.3] - 2025-12-10

### Fixed
- Fixed map not loading on first page load (requires reload to show)
- Added waitForLibraries() function to ensure Leaflet, Chart.js, toGeoJSON and JSZip are loaded
- Implemented IntersectionObserver to detect when widget becomes visible
- Added container visibility check (offsetWidth > 0) before creating map
- Increased initial delay to 200ms for container rendering
- Added display:block to container styles
- Map creation now retries if container is not visible (recursive check)
- Added console.log messages for better debugging
- Try-catch block around map creation to handle errors gracefully
- Fallback timeout (500ms) for browsers without IntersectionObserver support

## [2.0.2] - 2025-12-10

### Fixed
- Fixed map not rendering on initial load (blank map issue)
- Added explicit dimensions to map container before Leaflet initialization
- Map container now has min-height, max-height and overflow:hidden
- Added .leaflet-container CSS rules with !important for dimensions
- Moved map creation to 50ms setTimeout to ensure DOM is fully painted
- Split createMap into createMap + loadTrackData for better control
- Added preferCanvas: true option to Leaflet for better performance
- Force invalidateSize(true) with 4 attempts (200ms, 500ms, 1000ms, 2000ms)
- Container dimensions set via JavaScript before map initialization

## [2.0.1] - 2025-12-10

### Fixed
- Fixed "canvas.getContext is not a function" error
- Added validation to check if Chart.js library is loaded before use
- Added validation to ensure element is HTMLCanvasElement
- Added 100ms delay before creating chart to ensure DOM is ready
- Added proper context validation before chart creation
- Improved error messages for debugging

## [2.0.0] - 2025-12-10

### Changed - MAJOR RELEASE
- **Replaced Leaflet Elevation with Chart.js** for elevation charts
- Complete rewrite of elevation visualization system
- Now uses HTML5 Canvas with Chart.js 4.4.1 for modern, reliable charts
- Removed dependency on @raruto/leaflet-elevation library
- Map still uses Leaflet 1.9.4 for map display
- Statistics calculation completely independent from chart library

### Added
- Chart.js integration for professional elevation graphs
- New `createElevationChart()` method using Canvas API
- Tooltip support showing distance and elevation on hover
- Better gradient fills with customizable opacity
- Smooth line tension (0.4) for natural elevation curves
- `hexToRgba()` helper function for color manipulation
- Elevation gain calculation (desnivel positivo)
- 5 statistics displayed: Distance, Min/Max/Avg Elevation, Elevation Gain

### Fixed
- Map now renders correctly on initial load without resize
- Elevation chart displays immediately without manual intervention
- Statistics always show even if elevation data fails
- Chart responsive and adapts to container width automatically
- No more blank charts or missing data issues
- Console logs added for better debugging
- Multiple `invalidateSize()` calls ensure proper map rendering

### Technical
- Chart.js loaded from CDN: cdn.jsdelivr.net/npm/chart.js@4.4.1
- Canvas element replaces div for elevation display
- Chart destroyed and recreated properly on re-initialization
- Better color management with RGBA conversion
- Widget height set to 200px for optimal display

## [1.0.7] - 2025-12-10

### Fixed
- Complete rewrite of map initialization sequence
- Statistics are now calculated and displayed BEFORE elevation control initialization
- Added map.whenReady() event to ensure proper map loading
- Moved elevation control creation to AFTER statistics calculation
- Improved coordinate extraction for MultiLineString geometries
- Better handling of time extraction from GPX/KML properties
- Added console.log for debugging data flow
- Reduced chart height to 160px for better initial rendering
- Only 2 resize attempts (250ms, 750ms) to avoid conflicts
- Width is calculated dynamically from container on each load
- Changed elevation control initialization order to fix blank display
- Added scrollWheelZoom and proper map options
- Fixed stats not showing by ensuring displayCustomSummary runs first

## [1.0.6] - 2025-12-10

### Fixed
- Complete refactoring of elevation statistics calculation
- Added custom calculateElevationStats function to compute distance, time, and elevations from GeoJSON
- Disabled automatic summary from Leaflet Elevation (summary: false)
- Created displayCustomSummary function to show formatted statistics
- Implemented calculateDistance using Haversine formula for accurate distance calculation
- Added formatTime function to display time in HH:MM'SS" format
- Fixed elevation values showing 0.00 m by filtering valid elevations from coordinates
- Simplified resize logic with only 3 attempts (100ms, 500ms, 1000ms)
- Reduced chart container height to 200px for better proportions
- Changed summary div display from flex to block for proper line breaks
- Added clear: both to prevent floating issues
- Removed max-height constraints that caused layout problems
- Fixed summary showing all data in one line by using proper HTML structure

## [1.0.5] - 2025-12-10

### Fixed
- Fixed chart not rendering correctly on initial load without window resize
- Improved width calculation using container dimensions instead of fixed values
- Added automatic resize sequence with multiple attempts (50ms, 200ms, 500ms, 1000ms, 1500ms)
- Enhanced resizeEverything function to recalculate width and update SVG dimensions
- Improved formatSummaryText to parse line by line for better data extraction
- Fixed summary display to show all elevation data clearly (Distance, Time, Min/Max/Avg Elevation)
- Added max-height constraints to prevent layout shifts
- Increased summary text size and padding for better readability
- Added overflow hidden to chart container
- Set explicit SVG dimensions on each resize cycle
- Improved CSS with max-width: 100% for SVG elements

## [1.0.4] - 2025-12-10

### Fixed
- Fixed elevation chart not rendering properly on published pages
- Changed summary display from 'inline' to 'multiline' for better statistics visibility
- Improved elevation control configuration with explicit width/height values
- Enhanced styleSummaryText function to find and format elevation data better
- Increased chart container height to 220px for better visibility
- Added white background (95% opacity) to chart container for better contrast
- Fixed SVG height to 180px to ensure proper rendering
- Added legend and ruler to elevation control for better UX
- Improved CSS selectors for area fill with explicit color values

## [1.0.3] - 2025-12-10

### Fixed
- Fixed elevation graph not displaying data fill area on published pages
- Changed elevation control theme from 'black-theme' to 'lime-theme' for better visibility
- Added explicit fill and stroke styles for elevation area
- Improved elevation control configuration with proper margins and dimensions
- Added multiple resize() calls to ensure proper chart rendering
- Enhanced CSS selectors to force visualization of elevation area
- Added background color to elevation control for better contrast

## [1.0.2] - 2025-12-10

### Changed
- Updated author URI to kromahost.com

## [1.0.1] - 2025-12-10

### Fixed
- Fixed plugin header validation error
- Removed special characters from plugin metadata
- Compacted map and elevation chart heights by 20%

## [1.0.0] - 2025-12-10

### Added
- Initial release of Elevation Map Elementor Widget
- Support for GPX, KML, and KMZ file formats
- Glass morphism design effects with blur and transparency controls
- Fully responsive design for mobile, tablet, and desktop
- Interactive elevation charts with Leaflet Elevation
- File upload functionality through WordPress media library
- External URL support for remote track files
- Customizable color schemes and gradients
- Adjustable map and chart heights
- Typography controls for all text elements
- Route color and weight customization
- DEM (Digital Elevation Model) endpoint configuration
- Automatic duplicate segment removal
- Loading animations and transitions
- Icon-based summary statistics
- Hover effects on UI elements
- Accessibility support with reduced motion preferences
- Multi-language ready (i18n support)
- Complete documentation (README.md, INSTALL.md)
- WordPress 6.7 compatibility
- Elementor 3.25 compatibility
- PHP 7.4+ support

### Technical Features
- Clean, modular code structure
- Separated CSS and JavaScript assets
- Efficient file loading and caching
- Security-focused file upload handling
- Performance-optimized animations
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- No jQuery dependencies in core functionality
- Elementor widget API integration
- Custom Elementor category (Kroma Maps)

### Dependencies
- WordPress 6.0+
- PHP 7.4+
- Elementor 3.0+
- Leaflet.js 1.9.4
- Leaflet Elevation 2.5.0
- ToGeoJSON 4.3.0
- JSZip 3.10.1

### Known Limitations
- Requires internet connection for map tiles and DEM data
- Large files (>10MB) may take longer to process
- DEM batch size limited to 90 coordinates per request
- IE11 not supported

---

## Future Roadmap

### [1.1.0] - Planned
- [ ] Additional map tile providers (Mapbox, Stamen, etc.)
- [ ] Export functionality for elevation data
- [ ] Print-friendly view option
- [ ] Advanced statistics (speed, pace, etc.)
- [ ] Waypoint markers support
- [ ] Custom icon uploads

### [1.2.0] - Planned
- [ ] Multi-track comparison
- [ ] 3D terrain visualization
- [ ] Offline map tile caching
- [ ] GPX route editor
- [ ] Integration with fitness APIs

### [2.0.0] - Planned
- [ ] Pro version with advanced features
- [ ] Heatmap visualization
- [ ] Route sharing functionality
- [ ] Custom basemap support
- [ ] Advanced analytics dashboard

---

## Support

For bug reports, feature requests, or support:
- Email: soporte@kromahosting.com
- Website: https://kromahosting.com

## License

GPL v2 or later - see LICENSE.txt for details
