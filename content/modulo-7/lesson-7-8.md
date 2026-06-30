---
title: Deploy y Proyecto Final
duration: 90
sessionId: modulo-7--lesson-7-8
---

# Deploy a producción

Tu blog funciona en localhost. Ahora el mundo debe verlo.

- Frontend → Vercel.
- Backend (Express) → Render o Railway.
- Base de datos → Supabase (ya está en la nube).

Note:
Preguntar: ¿alguien ha subido algo a internet?
Explicar la diferencia entre localhost y producción.

---

## Preparar frontend para producción

```bash
# Construir el proyecto
npm run build

# Probar build local
npx serve -s dist
```

Asegurar variables de entorno:

```bash
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJ...
```

Note:
Hacer el build en vivo.
Mostrar la carpeta dist generada.
Verificar que las variables de entorno están configuradas.

---

## Deploy en Vercel

1. Subir el proyecto a GitHub.
2. Ir a https://vercel.com.
3. "Add New Project".
4. Importar el repo.
5. Agregar variables de entorno.
6. Deploy.

```bash
# O desde CLI
npm i -g vercel
vercel --prod
```

Note:
Mostrar el deploy desde GitHub.
Explicar que Vercel detecta automáticamente Vite/React.
Agregar las variables de entorno en el dashboard.

---

## Deploy del backend (Express)

Si usaron Supabase como backend, el frontend ya funciona.

Si tienen un backend Express aparte:

Opción A: **Render** (gratis)
Opción B: **Railway** (gratis con límites)

```bash
# En el backend
npm install
npm start
```

Note:
Si usaron Supabase directo desde el frontend, no necesitan backend.
Si tienen Express, mostrar deploy en Render.
Explicar que Render necesita un `start` script en package.json.

---

## Variables de entorno en Vercel

En el dashboard de Vercel:

```
Settings → Environment Variables

VITE_SUPABASE_URL: https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY: eyJhbGciOiJ...
```

Importante: VITE_ es necesario para Vite.

Note:
Explicar por qué VITE_ es necesario.
Vite solo expone variables que empiezan con VITE_.
Las variables se cargan en build time.

---

## Probar la aplicación en vivo

Una vez desplegado:

1. Abrir la URL de Vercel.
2. Probar CRUD completo.
3. Probar autenticación.
4. Compartir el link.

```bash
# Para redeploy automático
git push origin main
```

Note:
Vercel hace deploy automático con cada push a main.
Mostrar el flujo: código → git push → Vercel deploy.
Probar todo el flujo en vivo.

---

## Checklist de proyecto final

- [ ] Blog funcional en producción.
- [ ] CRUD de posts contra Supabase.
- [ ] Autenticación con email/password.
- [ ] Responsive design.
- [ ] README con instrucciones.
- [ ] Repositorio público en GitHub.
- [ ] Link compartido en Discord/Campus.

Note:
Ayudar a cada estudiante a completar su checklist.
Verificar que todo funcione.
Animar a compartir el link.

---

## Mini demo

Cada estudiante presenta su blog (2 min):

1. URL del blog.
2. Funcionalidades implementadas.
3. Un detalle que les guste.
4. Un reto que superaron.

Note:
Crear un ambiente seguro y de celebración.
Aplaudir cada presentación.
Dar feedback constructivo.

---

## Retrospectiva del módulo

¿Qué aprendimos?

- Formularios controlados y React Hook Form.
- Consumo de APIs con useEffect.
- Estado global con Context API.
- Backend con Express.
- CRUD completo.
- Base de datos con Supabase.
- Deploy a producción.

El blog full-stack está listo. Este puede ser su portafolio.

Note:
Hacer preguntas de reflexión.
¿Qué fue lo más difícil? ¿Lo más divertido?
Recordar que este es su primer proyecto full-stack profesional.

---

# Cierre

- Sigan practicando.
- El portafolio comienza aquí.
- El módulo 8: temas avanzados.
- ¡Felicidades por completar React Avanzado!

Note:
Dar palabras de motivación.
Anunciar horarios del siguiente módulo.
Responder preguntas finales.
