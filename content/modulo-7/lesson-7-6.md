---
title: CRUD completo con Express
duration: 90
sessionId: modulo-7--lesson-7-6
---

# CRUD completo

Create, Read, Update, Delete — las 4 operaciones básicas.

```
CREATE → POST   /posts
READ   → GET    /posts  y  GET /posts/:id
UPDATE → PUT    /posts/:id
DELETE → DELETE /posts/:id
```

Note:
Repasar los verbos HTTP y su propósito.
Dibujar la tabla CRUD en pizarra.

---

## Setup del servidor

```js
const express = require('express');
const app = express();
app.use(express.json());

let posts = [
  { id: 1, title: 'Introducción', content: 'Primer post' },
  { id: 2, title: 'Express', content: 'Aprendiendo rutas' },
];

let nextId = 3;
```

Note:
Crear el proyecto desde cero.
Explicar que el array es nuestra "base de datos" por ahora.
`nextId` nos da IDs auto-incrementales.

---

## GET — Leer todos

```js
app.get('/posts', (req, res) => {
  res.json(posts);
});
```

GET no modifica datos, solo devuelve.

Note:
Endpoints que no cambian el estado: GET, HEAD, OPTIONS.
Son "seguros" — pueden llamarse múltiples veces sin efecto secundario.

---

## GET — Leer uno

```js
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'No encontrado' });
  }

  res.json(post);
});
```

Note:
Probar con Postman: /posts/1 funciona, /posts/99 da 404.
Explicar que 404 es el código correcto para "no existe".

---

## POST — Crear

```js
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  const newPost = {
    id: nextId++,
    title,
    content: content || '',
    author: author || 'Anónimo',
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});
```

Note:
Validar que title y content existan.
Status 201 = Created.
Mostrar cómo se agrega al array.

---

## PUT — Actualizar

```js
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'No encontrado' });
  }

  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;

  res.json(post);
});
```

Note:
PUT reemplaza o actualiza parcialmente según la implementación.
Mostrar la diferencia entre PUT y PATCH.
El post se modifica in-place en el array.

---

## DELETE — Eliminar

```js
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'No encontrado' });
  }

  posts.splice(index, 1);
  res.status(204).send();
});
```

Note:
Status 204 = No Content (respuesta exitosa sin cuerpo).
Probar que el post ya no aparece en GET.
Splice elimina del array en memoria.

---

## Probar todos los endpoints

```
GET    /posts      → Listar
GET    /posts/1    → Uno
POST   /posts      → Crear  { "title": "Nuevo", "content": "..." }
PUT    /posts/1    → Actualizar  { "title": "Editado" }
DELETE /posts/1    → Eliminar
```

Note:
Probar todo el flujo con Postman.
Crear un post, listar, actualizar, ver cambios, eliminar.
Mostrar cómo el array cambia en cada paso.

---

## Ejercicio

Completa el CRUD con las rutas de usuarios:

1. `POST /users` → crear usuario.
2. `GET /users` → listar usuarios.
3. `PUT /users/:id` → actualizar usuario.
4. `DELETE /users/:id` → eliminar usuario.

Agrega validaciones: email requerido, nombre mínimo 3 caracteres.

Note:
Dar tiempo para el ejercicio.
Caminar y resolver dudas.
Revisar la solución en grupo.

---

# Resumen

- CRUD = Create, Read, Update, Delete.
- GET no modifica datos; POST, PUT, DELETE sí.
- Validar entradas con status 400.
- Status codes: 200, 201, 204, 400, 404.
- Los arrays en memoria son temporales.
- Próxima clase: base de datos real con Supabase.

Note:
Preguntar dudas.
Adelantar que en la siguiente clase los datos serán persistentes.
