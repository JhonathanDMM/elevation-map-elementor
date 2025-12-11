# 📋 RESUMEN RÁPIDO: Actualizaciones Automáticas

## ✅ Respuesta a tus 2 Preguntas

### 1. ¿Por qué sale "Activar" después de reemplazar el plugin?

**Problema:** WordPress **siempre desactiva** un plugin cuando lo reemplazas manualmente (borrar carpeta + subir nuevo ZIP).

**Solución:** ❌ NO reemplaces manualmente → ✅ USA el sistema de actualizaciones de WordPress

---

### 2. ¿Cómo hacer que WordPress detecte actualizaciones automáticamente?

**✅ SOLUCIÓN IMPLEMENTADA:** Sistema de actualizaciones desde GitHub (GRATIS)

---

## 🚀 Cómo Funciona Ahora

### Setup Inicial (Solo 1 vez)

1. **Crea repositorio en GitHub:**
   - Ve a github.com → New Repository
   - Nombre: `elevation-map-elementor`
   - ✅ Public
   - Crea el repositorio

2. **Sube el plugin a GitHub:**
   ```bash
   cd /Users/jhonathanbonilladorado/Desktop/Mapas/elevation-map-elementor
   
   git init
   git add .
   git commit -m "Initial commit - v2.3.0"
   git remote add origin https://github.com/TU_USUARIO/elevation-map-elementor.git
   git branch -M main
   git push -u origin main
   ```

3. **Actualiza la URL en el plugin:**
   - Abre `elevation-map-elementor.php`
   - Línea 56: Cambia `TU_USUARIO` por tu usuario real de GitHub
   - Guarda

---

## 🔄 Para Publicar Actualizaciones

### Opción A: Script Automático (FÁCIL)

```bash
cd /Users/jhonathanbonilladorado/Desktop/Mapas/elevation-map-elementor
./create-release.sh 2.3.1 "Descripción de cambios"
```

Luego:
1. Ve a GitHub → tu repo → Releases → Create new release
2. Selecciona el tag `v2.3.1` (ya creado por el script)
3. Sube el ZIP: `elevation-map-elementor-v2.3.1.zip`
4. Publica

### Opción B: Manual

```bash
# 1. Actualiza versión en elevation-map-elementor.php
# 2. Crea ZIP
cd /Users/jhonathanbonilladorado/Desktop/Mapas
zip -r elevation-map-elementor-v2.3.1.zip elevation-map-elementor/ -x "*.DS_Store" "*.git*"

# 3. Sube a GitHub
cd elevation-map-elementor
git add .
git commit -m "Version 2.3.1"
git tag v2.3.1
git push origin main
git push origin v2.3.1

# 4. En GitHub:
# - Releases → Create new release
# - Tag: v2.3.1
# - Sube el ZIP
# - Publica
```

---

## ✨ Resultado Final

### ❌ ANTES (Manual):
1. Borrar carpeta del plugin
2. Subir nuevo ZIP
3. ⚠️ Plugin se desactiva
4. Tener que reactivarlo manualmente
5. Reconfigurar widgets

### ✅ AHORA (Automático):
1. Creas Release en GitHub
2. WordPress detecta actualización automáticamente
3. Click en "Actualizar" en WordPress
4. ✅ Plugin se actualiza **SIN desactivarse**
5. ✅ Todo sigue funcionando
6. ✅ Widgets mantienen su configuración

---

## 📊 Comparación

| Característica | Manual | Con GitHub |
|---|---|---|
| Plugin se desactiva | ✅ SÍ | ❌ NO |
| Widgets se pierden | ❌ A veces | ✅ NUNCA |
| Notificación automática | ❌ NO | ✅ SÍ |
| Un click para actualizar | ❌ NO | ✅ SÍ |
| Historial de versiones | ❌ NO | ✅ SÍ |
| Costo | Gratis | Gratis |

---

## 🎯 Próximos Pasos

1. **AHORA:** Instala la versión 2.3.0 (tiene el sistema de actualizaciones)
2. **HOY:** Configura GitHub (10 minutos)
3. **DESPUÉS:** Cada actualización será automática

---

## 📞 Ayuda Rápida

**Archivo completo de instrucciones:** `ACTUALIZACIONES-GITHUB.md`

**¿Dudas?** Lee ese archivo, tiene TODO el proceso paso a paso con capturas mentales.
