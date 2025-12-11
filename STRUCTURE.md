# Estructura del Plugin - Elevation Map Elementor Widget

```
elevation-map-elementor/
│
├── 📄 elevation-map-elementor.php    # Archivo principal del plugin
├── 📄 README.md                      # Documentación completa
├── 📄 INSTALL.md                     # Guía de instalación rápida
├── 📄 CHANGELOG.md                   # Registro de cambios
├── 📄 readme.txt                     # Readme de WordPress.org
├── 📄 LICENSE.txt                    # Licencia GPL v2
├── 📄 package-plugin.sh              # Script para empaquetar
│
├── 📁 assets/                        # Recursos estáticos
│   ├── 📁 css/
│   │   └── elevation-map-widget.css  # Estilos del widget
│   └── 📁 js/
│       └── elevation-map-widget.js   # JavaScript del widget
│
├── 📁 includes/                      # Archivos PHP adicionales
│   └── file-upload-handler.php       # Gestor de archivos GPX/KML/KMZ
│
└── 📁 widgets/                       # Widgets de Elementor
    └── elevation-map-widget.php      # Clase del widget principal

```

## 📊 Estadísticas

- **Total de Archivos**: 12
- **Líneas de Código**: ~2,500+
- **Tamaño Aproximado**: < 100 KB
- **Versión**: 1.0.0

## 🔧 Archivos Principales

### Core Files
- **elevation-map-elementor.php**: Inicializa el plugin, registra hooks y carga dependencias
- **widgets/elevation-map-widget.php**: Define el widget de Elementor con todos sus controles

### Assets
- **assets/css/elevation-map-widget.css**: 700+ líneas de CSS con diseño moderno
- **assets/js/elevation-map-widget.js**: 500+ líneas de JavaScript para funcionalidad

### Documentation
- **README.md**: Documentación completa con ejemplos y FAQ
- **INSTALL.md**: Guía paso a paso para instalación
- **CHANGELOG.md**: Historial de versiones

## 🎯 Funcionalidades por Archivo

### elevation-map-elementor.php
✅ Inicialización del plugin
✅ Verificación de dependencias (Elementor)
✅ Registro de widgets
✅ Enqueue de scripts y estilos
✅ Categorías personalizadas

### elevation-map-widget.php
✅ Controles de Elementor (50+ opciones)
✅ Renderizado del widget
✅ Configuración de archivos (upload/URL)
✅ Personalización de diseño
✅ Sistema de plantillas

### elevation-map-widget.css
✅ Variables CSS personalizables
✅ Efectos glass morphism
✅ Animaciones y transiciones
✅ Diseño responsive
✅ Temas claro/oscuro ready

### elevation-map-widget.js
✅ Inicialización de mapas
✅ Carga de archivos GPX/KML/KMZ
✅ Procesamiento de elevación
✅ Gráficos interactivos
✅ Gestión de eventos

### file-upload-handler.php
✅ Permite tipos MIME personalizados
✅ Validación de archivos
✅ Seguridad en uploads
✅ Compatibilidad con WordPress

## 📦 Dependencias Externas (CDN)

- Leaflet.js 1.9.4
- Leaflet Elevation 2.5.0
- ToGeoJSON 4.3.0
- JSZip 3.10.1

## 🚀 Próximos Pasos

1. **Instalar**: Sube el plugin a WordPress
2. **Activar**: Activa en Plugins → Elevation Map
3. **Usar**: Busca "Mapa de Altimetría" en Elementor
4. **Personalizar**: Ajusta colores y estilos
5. **Publicar**: ¡Disfruta de tus mapas!

---

**Última actualización**: Diciembre 2025
**Desarrollado por**: Kroma Hosting
