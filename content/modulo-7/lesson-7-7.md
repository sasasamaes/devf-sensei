---
title: Supabase y Firebase
duration: 90
sessionId: modulo-7--lesson-7-7
---

# Bases de datos reales

Hasta ahora los datos viven en memoria.

- Cada vez que reiniciamos el servidor → se borran.
- No podemos compartir datos entre usuarios.
- Necesitamos persistencia real.

Note:
Preguntar: ¿qué pasa si apagan su servidor?
Los datos desaparecen.
Hoy vamos a hacer que los datos vivan para siempre.

---

## ¿Supabase o Firebase?

| | Supabase | Firebase |
|---|----------|----------|
| Base de datos | PostgreSQL (SQL) | Firestore (NoSQL) |
| Autenticación | Sí | Sí |
| Precio | Generoso free tier | Generoso free tier |
| Aprendizaje | SQL estándar | Documentos |
| API | REST + Realtime | SDK propietario |

Note:
Explicar la diferencia entre SQL y NoSQL.
Para este curso usamos Supabase por SQL y porque es más cercano a lo profesional.

---

## Crear proyecto en Supabase

1. Ir a https://supabase.com
2. Crear cuenta con GitHub.
3. "New project".
4. Nombre: `blog-devf`.
5. Database password segura.
6. Esperar a que se cree la base de datos.

Note:
Hacer el registro en vivo.
Mostrar el dashboard de Supabase.
Explicar las secciones: Table Editor, SQL Editor, Authentication.

---

## Crear tabla posts

```sql
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'Anónimo',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Ejecutar en SQL Editor de Supabase.

Note:
Explicar cada tipo de dato.
BIGSERIAL = auto-increment.
TIMESTAMPTZ = fecha con zona horaria.
Mostrar la tabla creada en Table Editor.

---

## API Key de Supabase

En el dashboard de Supabase:

```
Project Settings → API

URL: https://[project].supabase.co
anon key: eyJhbGciOiJIUzI1NiIs...
```

Guardar en `.env` del frontend:

```bash
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJ...
```

Note:
Explicar qué es una API key y por qué la anon key es segura.
Row Level Security (RLS) protege los datos.

---

## Conectar con fetch nativo

```js
const SUPABASE_URL = 'https://[project].supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJ...';

// GET /posts
const response = await fetch(
  `${SUPABASE_URL}/rest/v1/posts`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);
const posts = await response.json();
```

Note:
Mostrar que es el mismo fetch que ya conocen.
Solo cambia la URL y los headers.
Hacer GET y mostrar los datos en consola.

---

## CRUD con Supabase REST API

```js
// POST - Crear
fetch(`${SUPABASE_URL}/rest/v1/posts`, {
  method: 'POST',
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
  body: JSON.stringify({ title, content }),
});

// DELETE
fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
  method: 'DELETE',
  headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
});
```

Note:
Explicar el query param `id=eq.${id}`.
`eq` = equals — es la sintaxis de Supabase.
`Prefer: return=representation` devuelve el registro creado.

---

## Realtime: cambios en vivo

```js
const channel = supabase
  .channel('posts-changes')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Nuevo post:', payload.new);
      setPosts(prev => [...prev, payload.new]);
    }
  )
  .subscribe();
```

Note:
Explicar que Realtime permite que todos los usuarios vean cambios en vivo.
Mostrar dos pestañas del mismo frontend.
Crear un post en una y verlo aparecer en la otra.

---

## Autenticación básica

```js
const { data, error } = await supabase.auth.signUp({
  email: 'user@email.com',
  password: 'password123',
});

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@email.com',
  password: 'password123',
});
```

Note:
Habilitar email auth en Supabase.
Mostrar el flujo de registro y login.
Conectar con el UserContext de la clase 3.

---

## Ejercicio

Migra tu blog a Supabase:

1. Crea tabla posts con los campos correctos.
2. Configura la conexión desde tu frontend.
3. Reemplaza el backend local por Supabase.
4. Implementa GET, POST, DELETE contra Supabase.
5. (Opcional) Agrega autenticación por email.

Note:
Dar tiempo para el ejercicio.
Ayudar a configurar las variables de entorno.
Mostrar la migración del array a Supabase.

---

# Resumen

- Supabase: PostgreSQL + REST API + Realtime.
- Reemplaza tu backend local por Supabase.
- `fetch` funciona igual, solo cambia la URL.
- Realtime sincroniza datos entre usuarios.
- Auth por email con `supabase.auth.signUp()`.
- Próxima clase: deploy a producción.

Note:
Preguntar dudas.
Adelantar la clase de deploy.
