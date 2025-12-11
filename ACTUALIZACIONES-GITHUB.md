# 🔄 Configuración de Actualizaciones Automáticas con GitHub

Este plugin ahora soporta actualizaciones automáticas desde GitHub Releases.

## 📋 Pasos para Configurar

### 1. Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Click en **"New Repository"** (botón verde)
3. Nombre del repositorio: `elevation-map-elementor`
4. Descripción: "Plugin de WordPress para mapas de altimetría con Elementor"
5. Selecciona **"Public"** (para que funcionen las actualizaciones)
6. ✅ Marca **"Add a README file"**
7. Click en **"Create repository"**

### 2. Subir el Plugin al Repositorio

```bash
cd /Users/jhonathanbonilladorado/Desktop/Mapas/elevation-map-elementor

# Inicializar git
git init

# Añadir todos los archivos
git add .

# Primer commit
git commit -m "Initial commit - v2.2.1"

# Conectar con GitHub (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/elevation-map-elementor.git

# Subir al repositorio
git branch -M main
git push -u origin main
```

### 3. Actualizar la URL en el Plugin

1. Abre `elevation-map-elementor.php`
2. Busca la línea 56:
   ```php
   'https://github.com/TU_USUARIO/elevation-map-elementor/',
   ```
3. Reemplaza `TU_USUARIO` con tu usuario real de GitHub
4. Guarda el archivo

### 4. Crear un Release (Nueva Versión)

Cada vez que quieras publicar una actualización:

#### Desde la Terminal:

```bash
cd /Users/jhonathanbonilladorado/Desktop/Mapas/elevation-map-elementor

# Actualizar versión en el plugin (ejemplo: 2.2.2)
# Edita elevation-map-elementor.php y cambia la versión

# Commit los cambios
git add .
git commit -m "Version 2.2.2 - Descripción de cambios"

# Crear tag con la versión
git tag v2.2.2

# Subir cambios y tag
git push origin main
git push origin v2.2.2
```

#### Desde GitHub (Recomendado):

1. Ve a tu repositorio en GitHub
2. Click en **"Releases"** (lado derecho)
3. Click en **"Create a new release"**
4. **Tag version:** Escribe `v2.2.2` (la nueva versión)
5. **Release title:** `Version 2.2.2`
6. **Description:** Escribe los cambios de esta versión
7. **Attach binaries:** Sube el archivo `elevation-map-elementor-v2.2.2.zip`
8. Click en **"Publish release"**

### 5. Cómo Funciona

Una vez configurado:

1. **Subir nueva versión:**
   - Actualiza el número de versión en `elevation-map-elementor.php`
   - Crea el ZIP: `./package-plugin.sh` o manualmente
   - Crea un Release en GitHub con el ZIP adjunto

2. **WordPress detecta la actualización:**
   - WordPress revisa GitHub cada 12 horas automáticamente
   - Si hay nueva versión, aparece en **Plugins → Actualizaciones**
   - Click en "Actualizar" y listo ✅

3. **¡No más desactivación!**
   - Al actualizar desde WordPress, el plugin **permanece activado**
   - No necesitas reactivarlo manualmente

## 🎯 Ventajas

✅ Actualizaciones automáticas como plugins oficiales  
✅ El plugin NO se desactiva al actualizar  
✅ Notificaciones de actualización en el admin de WordPress  
✅ 100% Gratis (GitHub es gratuito)  
✅ Control total sobre las versiones  
✅ Historial de cambios visible para usuarios

## 📝 Alternativas

Si prefieres **NO usar GitHub**, puedes:

### Opción A: Repositorio Oficial de WordPress.org
- **Ventaja:** Máxima visibilidad, confianza
- **Desventaja:** Proceso de aprobación, debe ser código abierto
- **Cómo:** [https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/)

### Opción B: WP Update Server (Auto-hospedado)
- **Ventaja:** Control total en tu servidor
- **Desventaja:** Requiere configurar servidor propio
- **Librería:** [https://github.com/YahnisElsts/wp-update-server](https://github.com/YahnisElsts/wp-update-server)

### Opción C: Servicios Comerciales
- **Freemius:** Sistema completo de licencias y actualizaciones
- **EDD Software Licensing:** Para vender plugins
- **Desventaja:** Pagos mensuales/comisiones

## ❓ Solución de Problemas

### No aparece la actualización en WordPress

1. Verifica que la URL de GitHub esté correcta en `elevation-map-elementor.php`
2. Asegúrate de que el repositorio sea **público**
3. Verifica que el tag del Release comience con `v` (ejemplo: `v2.2.2`)
4. En WordPress, ve a **Plugins** y click en "Buscar actualizaciones"

### Error al actualizar

- Verifica que el ZIP adjunto al Release contenga la carpeta `elevation-map-elementor/` en la raíz
- El ZIP debe tener la estructura correcta (usa `package-plugin.sh` para crearlo)

## 🔐 Repositorio Privado (Opcional)

Si quieres que el repositorio sea privado:

1. Crea un **Personal Access Token** en GitHub:
   - Settings → Developer settings → Personal access tokens → Generate new token
   - Permisos necesarios: `repo` (full control)
2. Añade el token al código:
   ```php
   $myUpdateChecker->setAuthentication('tu_token_aqui');
   ```

**Nota:** Para uso personal, repositorio público es suficiente y más simple.

## 📞 Soporte

Si tienes problemas, revisa:
- [Documentación de Plugin Update Checker](https://github.com/YahnisElsts/plugin-update-checker)
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
