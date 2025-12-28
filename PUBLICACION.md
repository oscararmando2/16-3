# 🚀 Guía de Publicación del Sitio Web

## ¡Tu sitio web está listo para publicarse!

### Link del sitio web una vez configurado:
**https://oscararmando2.github.io/16-3/**

---

## 📋 Pasos para publicar tu sitio

Ya se ha creado todo lo necesario para publicar tu sitio web automáticamente. Solo necesitas activar GitHub Pages siguiendo estos pasos simples:

### 1. Ve a la configuración de tu repositorio
- Abre este enlace: https://github.com/oscararmando2/16-3/settings/pages
- O navega manualmente: Repositorio → Settings → Pages (en el menú lateral)

### 2. Configura GitHub Pages
- En la sección **"Source"** (Fuente)
- Selecciona **"GitHub Actions"** del menú desplegable
- Haz clic en **Save** si aparece el botón

### 3. Espera el despliegue
- Ve a la pestaña **Actions**: https://github.com/oscararmando2/16-3/actions
- Verás el workflow "Deploy to GitHub Pages" ejecutándose
- Espera a que aparezca un ✅ verde (toma 1-2 minutos)

### 4. ¡Visita tu sitio!
Tu sitio web estará disponible en:
**https://oscararmando2.github.io/16-3/**

---

## 🔄 Actualizaciones Automáticas

Una vez configurado, tu sitio se actualizará automáticamente cada vez que:
- Hagas cambios en la rama `main`
- Hagas cambios en la rama `copilot/publish-website`

No necesitas hacer nada más, ¡solo editar el código y hacer commit!

---

## 🛠️ Despliegue Manual (Opcional)

Si necesitas redesplegar manualmente:

1. Ve a **Actions**: https://github.com/oscararmando2/16-3/actions
2. Selecciona "Deploy to GitHub Pages"
3. Haz clic en **Run workflow**
4. Selecciona la rama (main o copilot/publish-website)
5. Haz clic en **Run workflow** de nuevo

---

## ❓ Problemas Comunes

### El sitio no se despliega
- ✅ Verifica que seleccionaste "GitHub Actions" en Settings → Pages
- ✅ Revisa la pestaña Actions para ver si hay errores
- ✅ Asegúrate de que el repositorio sea público (GitHub Pages gratis solo funciona con repos públicos)

### Error 404 al visitar el sitio
- Espera unos minutos más, el primer despliegue puede tardar hasta 5 minutos
- Intenta limpiar el caché del navegador (Ctrl + Shift + R)

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas, revisa:
1. La pestaña Actions para ver los logs del despliegue
2. La configuración de GitHub Pages en Settings

---

**¡Éxito con tu sitio web de 16:3 Agencia de Marketing Digital! 🎉**
