# GUÍA DE INSTALACIÓN RÁPIDA
## Elevation Map Elementor Widget

### 📦 PASO 1: Preparar el Plugin

1. **Comprimir la carpeta** (si no está comprimida):
   - En tu ordenador, selecciona la carpeta `elevation-map-elementor`
   - Haz clic derecho → "Comprimir" (Mac) o "Enviar a → Carpeta comprimida" (Windows)
   - Se creará un archivo `elevation-map-elementor.zip`

### 🚀 PASO 2: Subir a WordPress

#### Opción A: Desde el Panel de WordPress (Recomendado)

1. Accede a tu WordPress
2. Ve a **Plugins → Añadir nuevo**
3. Haz clic en **"Subir plugin"** (arriba)
4. Haz clic en **"Seleccionar archivo"**
5. Selecciona `elevation-map-elementor.zip`
6. Haz clic en **"Instalar ahora"**
7. Espera a que se instale
8. Haz clic en **"Activar plugin"**

#### Opción B: Por FTP/cPanel

1. Accede a tu servidor por FTP o cPanel File Manager
2. Ve a `/wp-content/plugins/`
3. Sube la carpeta `elevation-map-elementor` (sin comprimir)
4. Vuelve al panel de WordPress
5. Ve a **Plugins**
6. Busca "Elevation Map Elementor Widget"
7. Haz clic en **"Activar"**

### ✅ PASO 3: Verificar Instalación

Deberías ver un mensaje verde: "Plugin activado"

Si ves un error sobre Elementor:
- Ve a **Plugins → Añadir nuevo**
- Busca "Elementor"
- Instala y activa Elementor

### 🎨 PASO 4: Usar el Widget

1. Ve a **Páginas → Añadir nueva** (o edita una existente)
2. Haz clic en **"Editar con Elementor"**
3. En el panel izquierdo, busca la categoría **"KROMA MAPS"**
4. Verás el widget **"Mapa de Altimetría"** 🗺️
5. **Arrastra** el widget a tu página
6. Configura:
   - Sube tu archivo GPX/KML/KMZ
   - Personaliza colores y estilos
7. Haz clic en **"Actualizar"** o **"Publicar"**

### 🎯 PASO 5: Preparar tu Archivo de Mapa

#### Desde Strava:
1. Ve a tu actividad en Strava
2. Haz clic en el icono de 3 puntos (•••)
3. Selecciona **"Exportar GPX"**
4. Descarga el archivo

#### Desde Garmin Connect:
1. Ve a tu actividad
2. Haz clic en el icono de engranaje ⚙️
3. Selecciona **"Exportar a GPX"**
4. Descarga el archivo

#### Desde Google Earth:
1. Haz clic derecho en tu ruta
2. Selecciona **"Guardar lugar como..."**
3. Elige formato **KML** o **KMZ**
4. Guarda el archivo

### ⚙️ CONFIGURACIÓN RÁPIDA

**Configuración Mínima:**
```
✓ Subir archivo GPX/KML/KMZ
✓ Publicar
```

**Configuración Recomendada:**
```
✓ Subir archivo
✓ Cambiar título y subtítulo
✓ Personalizar color de ruta
✓ Ajustar fondo/gradiente
✓ Publicar
```

### 🔧 SOLUCIÓN DE PROBLEMAS

**❌ "El plugin no aparece"**
- Verifica que Elementor esté activado
- Limpia la caché: Elementor → Herramientas → Regenerar CSS

**❌ "No puedo subir el archivo"**
- Verifica que el archivo sea .gpx, .kml o .kmz
- Tamaño máximo: depende de tu hosting (normalmente 2-8MB)
- Contacta con tu hosting si persiste

**❌ "El mapa no se muestra"**
- Verifica que has subido el archivo correctamente
- Abre la consola del navegador (F12) y busca errores
- Limpia caché del navegador y WordPress

**❌ "Error al activar el plugin"**
- Verifica PHP 7.4+: Panel WordPress → Herramientas → Site Health
- Verifica permisos de archivos en el servidor

### 📞 SOPORTE

Si necesitas ayuda:
- Email: soporte@kromahosting.com
- Lee el README.md completo para más detalles
- Revisa la consola del navegador (F12) para errores específicos

### 🎉 ¡LISTO!

Tu widget está instalado y listo para usar. Ahora puedes crear mapas increíbles con análisis de altimetría en todas tus páginas.

---

**Última actualización**: Diciembre 2025
**Versión del plugin**: 1.0.0
