# Elevation Map Elementor Widget

Plugin de WordPress para Elementor que permite insertar mapas interactivos con análisis de altimetría. Compatible con archivos GPX, KML y KMZ. Incluye efectos glass morphism modernos y diseño completamente responsive.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![WordPress](https://img.shields.io/badge/WordPress-6.0+-green.svg)
![Elementor](https://img.shields.io/badge/Elementor-3.0+-purple.svg)
![PHP](https://img.shields.io/badge/PHP-7.4+-lightgrey.svg)

## 🎯 Características

- ✨ **Diseño Moderno**: Efectos glass morphism (liquid glass) con animaciones suaves
- 📱 **Totalmente Responsive**: Se adapta perfectamente a móviles, tablets y escritorio
- 🗺️ **Soporte Multi-formato**: GPX, KML y KMZ
- 🎨 **Totalmente Personalizable**: Colores, fondos, gradientes y estilos configurables
- 📊 **Análisis de Altimetría**: Gráficos de elevación interactivos
- 🚀 **Optimizado**: Carga rápida y eficiente
- 🔧 **Fácil de Usar**: Integración perfecta con Elementor
- 🌍 **Mapas Interactivos**: Basado en Leaflet.js
- 📈 **Datos DEM**: Integración con servicios de elevación digital

## 📋 Requisitos

- WordPress 6.0 o superior
- PHP 7.4 o superior
- Elementor 3.0 o superior
- Plugin activo: Elementor (gratuito o Pro)

## 📦 Instalación

### Método 1: Instalación Manual (Recomendado)

1. **Descarga el plugin**
   - Descarga la carpeta `elevation-map-elementor`

2. **Sube a WordPress**
   - Accede a tu WordPress vía FTP o cPanel
   - Navega a `/wp-content/plugins/`
   - Sube la carpeta `elevation-map-elementor` completa

3. **Activa el plugin**
   - Ve a `WordPress Admin → Plugins`
   - Busca "Elevation Map Elementor Widget"
   - Haz clic en "Activar"

### Método 2: Instalación ZIP

1. Comprime la carpeta `elevation-map-elementor` en un archivo .zip
2. Ve a `WordPress Admin → Plugins → Añadir nuevo`
3. Haz clic en "Subir plugin"
4. Selecciona el archivo .zip
5. Haz clic en "Instalar ahora"
6. Activa el plugin

## 🚀 Uso

### 1. Abrir Elementor

- Ve a la página donde quieres añadir el mapa
- Haz clic en "Editar con Elementor"

### 2. Añadir el Widget

1. En el panel izquierdo de Elementor, busca la categoría **"Kroma Maps"**
2. Arrastra el widget **"Mapa de Altimetría"** a tu página
3. El widget aparecerá en tu página

### 3. Configurar el Archivo del Mapa

#### Opción A: Subir Archivo

1. En la pestaña **"Contenido"**, ve a la sección **"Archivo del Mapa"**
2. Selecciona **"Subir Archivo"** en "Fuente del Archivo"
3. Haz clic en "Archivo de Ruta"
4. Sube tu archivo GPX, KML o KMZ desde tu ordenador
5. Haz clic en "Insertar"

#### Opción B: URL Externa

1. Selecciona **"URL Externa"** en "Fuente del Archivo"
2. Introduce la URL completa de tu archivo (ej: `https://ejemplo.com/ruta.gpx`)
3. Asegúrate de que la URL sea accesible públicamente

### 4. Personalizar el Diseño

#### Configuración del Mapa (Pestaña Contenido)

- **Altura del Mapa**: Ajusta la altura del mapa principal (200-800px o 20-100vh)
- **Altura del Gráfico**: Ajusta la altura del gráfico de elevación (100-400px)
- **Mostrar Encabezado**: Activa/desactiva el encabezado
- **Título**: Personaliza el título (ej: "🏃‍♂️ Ruta 10K Cauca")
- **Subtítulo**: Personaliza el subtítulo (ej: "Análisis de altimetría")
- **Endpoint DEM**: Configura el endpoint para datos de elevación

#### Estilos (Pestaña Estilo)

##### Fondo y Efectos
- **Tipo de Fondo**: Selecciona color sólido o gradiente
- **Color/Gradiente**: Personaliza los colores del fondo
  - Por defecto: Gradiente púrpura a rosa (#667eea → #764ba2)
- **Desenfoque de Vidrio**: Ajusta el efecto blur (0-50px)
- **Opacidad del Vidrio**: Controla la transparencia (0-1)
- **Radio de Borde**: Redondea las esquinas (0-50px)

##### Colores de la Ruta
- **Color de la Ruta**: Selecciona el color de la línea del mapa
  - Por defecto: Verde (#00a86b)
- **Grosor de la Línea**: Ajusta el ancho (1-10px)

##### Tipografía
- **Título**: Fuente, tamaño y color del título principal
- **Subtítulo**: Fuente, tamaño y color del subtítulo
- **Resumen**: Fuente, tamaño y color del resumen de datos
- **Color de Resaltado**: Color para elementos destacados

### 5. Guardar y Publicar

1. Haz clic en **"Actualizar"** o **"Publicar"**
2. Visualiza tu página para ver el mapa en acción

## 🎨 Ejemplos de Uso

### Ejemplo 1: Ruta de Running
```
Título: 🏃‍♂️ Carrera 10K Ciudad
Subtítulo: Recorrido oficial con análisis de altimetría
Archivo: 10k-ruta.gpx
Color de Ruta: #00a86b (verde)
Fondo: Gradiente púrpura a rosa
```

### Ejemplo 2: Ruta de Ciclismo
```
Título: 🚴‍♂️ Ruta MTB Montaña
Subtítulo: Trail de 45km con desnivel positivo
Archivo: mtb-trail.kml
Color de Ruta: #ff6b6b (rojo)
Fondo: Gradiente azul oscuro
```

### Ejemplo 3: Senderismo
```
Título: 🥾 Sendero Nacional
Subtítulo: Etapa 5 - Perfil completo
Archivo: https://ejemplo.com/sendero-etapa5.kmz
Color de Ruta: #ffa500 (naranja)
Fondo: Gradiente verde bosque
```

## 🔧 Configuración Avanzada

### Endpoint DEM Personalizado

Si tienes tu propio servicio de elevación digital:

1. Ve a la configuración del widget
2. En "Endpoint DEM", introduce tu URL personalizada
3. Formato esperado: `/tu-endpoint?locations=lat1,lon1|lat2,lon2`
4. Respuesta esperada: `{"results": [{"elevation": 1234}, ...]}`

### Personalización CSS Adicional

Puedes añadir CSS personalizado en `Elementor → Personalizado → CSS`:

```css
/* Cambiar el color del header */
.elevation-map-wrapper .header h1 {
    color: #ff6b6b !important;
}

/* Modificar las tarjetas de vidrio */
.elevation-map-wrapper .glass-card {
    background: rgba(255, 255, 255, 0.2) !important;
}

/* Ajustar el resumen */
.elevation-map-wrapper .custom-elevation-summary {
    background: linear-gradient(135deg, rgba(0, 168, 107, 0.2), rgba(0, 106, 0, 0.2)) !important;
}
```

## 📱 Responsive Design

El widget se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop** (>768px): Vista completa con todas las características
- **Tablet** (768px): Altura reducida, texto adaptado
- **Mobile** (<480px): Vista optimizada, controles simplificados
- **Landscape Mobile**: Ajustes específicos para orientación horizontal

## ❓ Preguntas Frecuentes (FAQ)

### ¿Qué formatos de archivo son compatibles?
GPX, KML y KMZ. Todos son formatos estándar de GPS.

### ¿Puedo usar archivos de Strava o Garmin?
Sí, exporta la ruta como GPX desde Strava/Garmin y súbela al widget.

### ¿El mapa funciona sin conexión?
No, requiere conexión a internet para cargar los tiles del mapa y datos de elevación.

### ¿Puedo tener múltiples mapas en la misma página?
Sí, puedes añadir tantos widgets como necesites.

### ¿Los archivos se suben a mi servidor?
Sí, si usas "Subir Archivo". Si usas "URL Externa", el archivo permanece en el servidor origen.

### ¿Funciona con Elementor gratuito?
Sí, no requiere Elementor Pro.

### ¿El diseño es personalizable?
Completamente. Todos los colores, tamaños y estilos son configurables desde Elementor.

### ¿Qué navegadores son compatibles?
Chrome, Firefox, Safari, Edge (versiones modernas). IE11 no soportado.

## 🐛 Solución de Problemas

### El mapa no se muestra

1. Verifica que Elementor esté activado
2. Comprueba que has subido/añadido un archivo válido
3. Revisa la consola del navegador (F12) para errores
4. Limpia la caché de WordPress y del navegador

### El archivo no se puede subir

1. Ve a `WordPress Admin → Medios → Añadir nuevo`
2. Intenta subir el archivo manualmente
3. Si falla, verifica los permisos de la carpeta `/wp-content/uploads/`
4. Contacta con tu hosting si el problema persiste

### Los datos de elevación no aparecen

1. Verifica que el endpoint DEM esté configurado correctamente
2. Comprueba que tu servidor puede hacer peticiones HTTP externas
3. Revisa si hay errores en la consola del navegador

### El diseño se ve roto

1. Limpia la caché de Elementor: `Elementor → Herramientas → Regenerar CSS`
2. Verifica que no hay CSS conflictivo de tu tema
3. Actualiza Elementor a la última versión

## 🔄 Actualizaciones

### v1.0.0 (Inicial)
- ✨ Lanzamiento inicial
- 🗺️ Soporte para GPX/KML/KMZ
- 🎨 Efectos glass morphism
- 📱 Diseño responsive
- 📊 Análisis de altimetría
- 🎛️ Controles personalizables

## 👨‍💻 Desarrollo

### Estructura del Plugin

```
elevation-map-elementor/
├── assets/
│   ├── css/
│   │   └── elevation-map-widget.css
│   └── js/
│       └── elevation-map-widget.js
├── includes/
│   └── file-upload-handler.php
├── widgets/
│   └── elevation-map-widget.php
├── elevation-map-elementor.php
└── README.md
```

### Tecnologías Utilizadas

- **Leaflet.js**: Mapas interactivos
- **Leaflet Elevation**: Gráficos de altimetría
- **ToGeoJSON**: Conversión de formatos
- **JSZip**: Manejo de archivos KMZ
- **PHP**: Backend de WordPress
- **Elementor API**: Integración con el constructor

## 📄 Licencia

GPL v2 or later

## 🤝 Soporte

Para soporte técnico:
- Email: soporte@kromahosting.com
- Website: https://kromahosting.com

## 🌟 Créditos

Desarrollado por **Kroma Hosting**

Librerías utilizadas:
- Leaflet (BSD 2-Clause License)
- Leaflet Elevation (GPL-3.0)
- ToGeoJSON (BSD License)
- JSZip (MIT License)

---

**¡Gracias por usar Elevation Map Elementor Widget!** 🎉
