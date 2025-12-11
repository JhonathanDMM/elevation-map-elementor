#!/bin/bash

# Script para crear una nueva versión del plugin
# Uso: ./create-release.sh 2.2.2 "Descripción de los cambios"

VERSION=$1
DESCRIPTION=$2

if [ -z "$VERSION" ]; then
    echo "❌ Error: Debes proporcionar un número de versión"
    echo "Uso: ./create-release.sh 2.2.2 \"Descripción de los cambios\""
    exit 1
fi

if [ -z "$DESCRIPTION" ]; then
    DESCRIPTION="Version $VERSION"
fi

echo "📦 Creando release v$VERSION..."
echo ""

# Crear el ZIP
echo "1️⃣ Empaquetando plugin..."
cd ..
zip -r "elevation-map-elementor-v${VERSION}.zip" elevation-map-elementor/ -x "*.DS_Store" "**/__MACOSX/*" "*.backup" "*.git*" "*.sh"
cd elevation-map-elementor

echo "✅ ZIP creado: elevation-map-elementor-v${VERSION}.zip"
echo ""

# Git commands
echo "2️⃣ Creando commit y tag..."
git add .
git commit -m "Version $VERSION"
git tag "v$VERSION"

echo "✅ Commit y tag creados"
echo ""

echo "3️⃣ Subiendo a GitHub..."
git push origin main
git push origin "v$VERSION"

echo ""
echo "✅ ¡Listo!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a GitHub: https://github.com/TU_USUARIO/elevation-map-elementor/releases"
echo "2. Click en 'Create a new release'"
echo "3. Selecciona el tag: v$VERSION"
echo "4. Sube el archivo: ../elevation-map-elementor-v${VERSION}.zip"
echo "5. Publica el release"
echo ""
echo "🔄 WordPress detectará la actualización automáticamente"

