# 🎯 GUÍA RÁPIDA: Publicar con VS Code + GitHub

## ✅ Ya está listo el repositorio Git local

He configurado:
- ✅ Repositorio git inicializado
- ✅ Primer commit creado (v2.3.0)
- ✅ Tag v2.3.0 creado
- ✅ 128 archivos listos para subir

---

## 📤 Ahora: Publicar en GitHub desde VS Code (3 pasos)

### **Paso 1: Ver la pestaña de Control de Código**

En VS Code, verás en la barra lateral izquierda el ícono de **Source Control** (un gráfico de ramificación). Ábrelo.

### **Paso 2: Publicar en GitHub**

Verás un botón grande que dice:

**"Publish to GitHub"** o **"Publicar en GitHub"**

Click en ese botón.

### **Paso 3: Elegir el tipo de repositorio**

VS Code te preguntará:
- ✅ **"Publish to GitHub public repository"** ← Elige este (necesario para actualizaciones gratuitas)
- ❌ "Publish to GitHub private repository" (requiere token)

### **Paso 4: Autenticación**

VS Code abrirá tu navegador para que autorices la conexión con GitHub:
1. Inicia sesión en GitHub si no lo estás
2. Click en **"Authorize Visual Studio Code"**
3. VS Code se conectará automáticamente

### **Paso 5: ¡Listo!**

VS Code subirá TODO automáticamente:
- ✅ Todos los archivos
- ✅ El commit inicial
- ✅ El tag v2.3.0

---

## 🔗 Después de publicar

1. VS Code te mostrará un mensaje: **"Successfully published to GitHub"**
2. Click en el botón **"Open on GitHub"** para ver tu repositorio
3. Copia la URL del repositorio (algo como: `https://github.com/tu-usuario/elevation-map-elementor`)

---

## ⚙️ Configurar la URL en el Plugin

Una vez tengas la URL del repositorio:

1. Abre el archivo: `elevation-map-elementor.php`
2. Ve a la **línea 56**
3. Cambia esto:
   ```php
   'https://github.com/TU_USUARIO/elevation-map-elementor/',
   ```
   Por tu URL real:
   ```php
   'https://github.com/jhonathanbonilla/elevation-map-elementor/', // ejemplo
   ```
4. Guarda el archivo
5. En VS Code, verás que el archivo aparece con una "M" (modificado)
6. Haz commit: Escribe "Fix: Update GitHub URL" y click en el ✓
7. Click en el botón **"Sync Changes"** (sincronizar)

---

## 🚀 Crear el Release en GitHub

Ahora que el código está en GitHub:

1. Ve a tu repositorio en GitHub
2. Click en **"Releases"** (lado derecho)
3. Click en **"Create a new release"**
4. En **"Choose a tag"**: Selecciona `v2.3.0`
5. **Title**: `Version 2.3.0`
6. **Description**:
   ```
   🎉 Primera versión con actualizaciones automáticas
   
   ✨ Nuevas características:
   - Sistema de actualizaciones automáticas desde GitHub
   - Colores totalmente personalizables
   - Runner marker con animación suave
   - Integración completa con Elementor
   
   📦 Para instalar: Descarga el archivo ZIP adjunto
   ```
7. **Attach binaries**: Sube el archivo `elevation-map-elementor-v2.3.0.zip`
8. Click en **"Publish release"**

---

## 🎉 ¡Ya está!

WordPress detectará automáticamente las actualizaciones desde GitHub.

---

## 📝 Para versiones futuras (super fácil)

Cada vez que quieras publicar una actualización:

### Opción A: Desde VS Code (Visual)

1. Modifica los archivos que necesites
2. En Source Control, verás los archivos modificados
3. Escribe un mensaje de commit (ej: "Version 2.3.1 - Fix colors")
4. Click en ✓ (Commit)
5. Click en **"Sync Changes"** (sincronizar)
6. Crea el Release en GitHub con el nuevo tag

### Opción B: Con el script automático

```bash
cd /Users/jhonathanbonilladorado/Desktop/Mapas/elevation-map-elementor
./publish-version.sh
```

El script te pedirá:
- Número de versión (ej: 2.3.1)
- Descripción de cambios

Y hará TODO automáticamente, solo tendrás que crear el Release en GitHub al final.

---

## 💡 Ventajas de VS Code + GitHub

✅ No necesitas escribir comandos git manualmente  
✅ Ves visualmente qué archivos cambiaron  
✅ Un click para sincronizar  
✅ Autenticación automática  
✅ Interfaz gráfica súper intuitiva  

---

## ❓ Preguntas Frecuentes

**P: ¿Qué pasa si el repositorio ya existe en GitHub?**  
R: Tendrás que eliminarlo primero o usar otro nombre.

**P: ¿Puedo hacer el repositorio privado después?**  
R: Sí, pero necesitarás configurar un token de acceso en el plugin para que WordPress pueda leer las actualizaciones.

**P: ¿VS Code me pedirá usuario/contraseña cada vez?**  
R: No, la autorización es permanente. VS Code recordará tu sesión de GitHub.

---

## 🆘 Problemas Comunes

### "No se puede publicar en GitHub"
- Asegúrate de estar conectado a internet
- Verifica que tienes una cuenta de GitHub
- Intenta cerrar y abrir VS Code

### "El repositorio ya existe"
- Usa otro nombre o borra el repositorio existente en GitHub
- O usa el comando: `git remote add origin URL` manualmente

---

## 📞 Siguiente Paso AHORA

👉 Ve a VS Code  
👉 Abre la pestaña **Source Control** (icono de ramificación)  
👉 Click en **"Publish to GitHub"**  

¡En 2 minutos estará en línea! 🚀
