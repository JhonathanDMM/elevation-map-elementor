#!/bin/bash

# ========================================
# Script de Publicación Automática v2
# Ejecuta SOLO UNA VEZ por versión nueva
# ========================================

echo "🚀 Asistente de Publicación de Versiones"
echo "=========================================="
echo ""

# Pedir versión
read -p "📝 Ingresa el número de versión (ej: 2.3.1): " VERSION
if [ -z "$VERSION" ]; then
    echo "❌ Debes ingresar una versión"
    exit 1
fi

read -p "📄 Descripción de cambios (opcional): " DESCRIPTION
if [ -z "$DESCRIPTION" ]; then
    DESCRIPTION="Version $VERSION"
fi

echo ""
echo "📦 Procesando versión v$VERSION..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# =====================
# PASO 1: Actualizar archivos PHP y JS
# =====================
echo "1️⃣ Actualizando versión en archivos..."

# Archivo PHP principal
sed -i.bak "s/\* Version: [0-9.]*/ * Version: $VERSION/" elevation-map-elementor.php
sed -i.bak "s/define('ELEVATION_MAP_VERSION', '[0-9.]*');/define('ELEVATION_MAP_VERSION', '$VERSION');/" elevation-map-elementor.php

# Archivo JavaScript
sed -i.bak "s/JavaScript v[0-9.]*/JavaScript v$VERSION/" assets/js/elevation-map-widget.js

# Limpiar backups
rm -f elevation-map-elementor.php.bak
rm -f assets/js/elevation-map-widget.js.bak

echo "   ✅ Archivos actualizados a v$VERSION"
echo ""

# =====================
# PASO 2: Crear ZIP
# =====================
echo "2️⃣ Creando paquete ZIP..."
cd ..
zip -q -r "elevation-map-elementor-v${VERSION}.zip" elevation-map-elementor/ -x "*.DS_Store" "**/__MACOSX/*" "*.backup" "*.git*" "*.sh" "*node_modules*"
cd elevation-map-elementor

if [ -f "../elevation-map-elementor-v${VERSION}.zip" ]; then
    echo "   ✅ ZIP creado: elevation-map-elementor-v${VERSION}.zip"
else
    echo "   ❌ Error al crear ZIP"
    exit 1
fi
echo ""

# =====================
# PASO 3: Git commit y push
# =====================
echo "3️⃣ Guardando cambios en Git..."

# Verificar si hay cambios
git add .
if git diff --cached --quiet; then
    echo "   ⚠️  No hay cambios para commitear"
else
    git commit -m "Version $VERSION - $DESCRIPTION"
    echo "   ✅ Commit creado"
fi

# Crear tag
git tag -a "v$VERSION" -m "Release version $VERSION"
echo "   ✅ Tag v$VERSION creado"

# Push
echo ""
echo "   📤 Subiendo a GitHub..."
git push origin main 2>&1 | grep -v "Username\|Password"
git push origin "v$VERSION" 2>&1 | grep -v "Username\|Password"

echo "   ✅ Subido a GitHub"
echo ""

# =====================
# PASO 4: Instrucciones para GitHub Release
# =====================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ¡Casi listo! Solo falta crear el Release en GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Pasos finales (2 minutos):"
echo ""
echo "1. Abre tu navegador y ve a:"

# Obtener la URL del repositorio
REPO_URL=$(git config --get remote.origin.url | sed 's/\.git$//')
if [[ $REPO_URL == git@github.com:* ]]; then
    REPO_URL=$(echo $REPO_URL | sed 's/git@github.com:/https:\/\/github.com\//')
fi

echo "   🔗 $REPO_URL/releases/new"
echo ""
echo "2. En el formulario:"
echo "   • Choose a tag: Selecciona 'v$VERSION'"
echo "   • Release title: Version $VERSION"
echo "   • Description: $DESCRIPTION"
echo ""
echo "3. Sube el archivo:"
echo "   📎 $(cd .. && pwd)/elevation-map-elementor-v${VERSION}.zip"
echo ""
echo "4. Click en 'Publish release' 🎉"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⏰ WordPress detectará la actualización en ~12 horas"
echo "💡 O puedes forzar la revisión en: Plugins > Buscar actualizaciones"
echo ""

# Abrir navegador automáticamente (opcional)
read -p "¿Abrir GitHub en el navegador ahora? (s/n): " OPEN_BROWSER
if [[ $OPEN_BROWSER == "s" ]] || [[ $OPEN_BROWSER == "S" ]]; then
    open "$REPO_URL/releases/new?tag=v$VERSION"
    echo "✅ Navegador abierto"
fi

echo ""
echo "🎉 ¡Proceso completado!"
