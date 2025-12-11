#!/bin/bash

# Script para empaquetar el plugin Elevation Map Elementor Widget
# Uso: bash package-plugin.sh

echo "🎁 Empaquetando Elevation Map Elementor Widget..."

# Nombre del plugin
PLUGIN_NAME="elevation-map-elementor"
VERSION="1.0.0"
OUTPUT_NAME="${PLUGIN_NAME}-v${VERSION}.zip"

# Crear archivo temporal para excluir
EXCLUDE_FILE=$(mktemp)

# Archivos y carpetas a excluir
cat > "$EXCLUDE_FILE" << EOF
*.git*
.DS_Store
Thumbs.db
*.log
node_modules/
package-plugin.sh
.env
*.bak
*.tmp
EOF

# Ir al directorio padre
cd "$(dirname "$0")/.."

echo "📦 Creando archivo ZIP..."

# Crear el ZIP excluyendo archivos innecesarios
if command -v zip &> /dev/null; then
    zip -r "$OUTPUT_NAME" "$PLUGIN_NAME" \
        -x@"$EXCLUDE_FILE" \
        -x "*.git*" \
        -x "*/.DS_Store" \
        -x "*/package-plugin.sh"
    
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
else
    echo "❌ Error: comando 'zip' no encontrado"
    echo "   Comprime manualmente la carpeta '$PLUGIN_NAME' en un archivo .zip"
fi

# Limpiar
rm -f "$EXCLUDE_FILE"

echo ""
echo "✨ ¡Listo!"
