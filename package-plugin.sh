#!/bin/bash

# Script para empaquetar el plugin Elevation Map Elementor Widget
# Uso: bash package-plugin.sh (ejecutar desde el directorio del plugin)

echo "🎁 Empaquetando Elevation Map Elementor Widget..."

# Nombre del plugin
PLUGIN_NAME="elevation-map-elementor"

# Obtener versión automáticamente del archivo principal
VERSION=$(grep -i "^ \* Version:" "$PLUGIN_NAME.php" | awk '{print $3}')

# Si no se encuentra la versión, usar una por defecto
if [ -z "$VERSION" ]; then
    VERSION="1.0.0"
    echo "⚠️  No se pudo detectar la versión, usando $VERSION por defecto"
else
    echo "📌 Versión detectada: $VERSION"
fi

OUTPUT_NAME="${PLUGIN_NAME}-v${VERSION}.zip"

# Ir al directorio padre
cd ..

echo "📦 Creando archivo ZIP..."

# Eliminar ZIP anterior si existe
rm -f "$OUTPUT_NAME"

# Crear el ZIP correctamente, excluyendo archivos innecesarios
zip -r "$OUTPUT_NAME" "$PLUGIN_NAME" \
    -x "*/\.git/*" \
    -x "*/\.gitignore" \
    -x "*/.DS_Store" \
    -x "*/package-plugin.sh" \
    -x "*/publish-version.sh" \
    -x "*/create-release.sh" \
    -x "*/CHANGELOG.md" \
    -x "*/STRUCTURE.md" \
    -x "*/INSTALL.md" \
    -x "*/GUIA-VSCODE-GITHUB.md" \
    -x "*/ACTUALIZACIONES-GITHUB.md" \
    -x "*/RESUMEN-ACTUALIZACIONES.md" \
    -x "*/INICIO-RAPIDO.md" \
    -x "*/node_modules/*" \
    -x "*/.env" \
    -x "*/\.backup" \
    -x "*/includes/plugin-update-checker/*" \
    -x "*/*.js.backup"
    
echo "✅ Plugin empaquetado exitosamente: $OUTPUT_NAME"
echo "📊 Tamaño del archivo:"
du -h "$OUTPUT_NAME"
echo ""
echo "📍 Ubicación: $(pwd)/$OUTPUT_NAME"
echo ""
echo "🚀 Siguiente paso:"
echo "   1. Ve a tu WordPress Admin → Plugins → Añadir nuevo"
echo "   2. Haz clic en 'Subir plugin'"
echo "   3. Selecciona el archivo: $OUTPUT_NAME"
echo "   4. Instala y activa"
echo ""
echo "✨ ¡Listo!"
