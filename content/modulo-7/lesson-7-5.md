---
title: Servidor con Node.js y Express
duration: 90
sessionId: modulo-7--lesson-7-5
---

# Nuestro primer servidor

Vamos a montar un servidor real con Node.js y Express.

```bash
mkdir blog-backend
cd blog-backend
npm init -y
npm install express
```

Note:
Hacer la instalación en vivo.
Explicar qué hace npm init y npm install.
Crear el proyecto desde cero con los estudiantes.

---

## Hola mundo con Express

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
```

Note:
Ejecutar y mostrar que funciona en el navegador.
Explicar cada línea.
`localhost` solo funciona en tu máquina.

---

## Endpoint GET /posts

```js
app.get('/posts', (req, res) => {
  const posts = [
    { id: 1, title: 'Primer post', content: 'Hola mundo' },
    { id: 2, title: 'Segundo post', content: 'Aprendiendo Express' },
  ];
  res.json(posts);
});
```

Note:
Mostrar que responde JSON en el navegador.
Comparar con jsonplaceholder.
Explicar que estos datos son estáticos.

---

## Recibir datos con POST

```js
app.use(express.json());

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  res.status(201).json(newPost);
});
```

Note:
Explicar express.json() como middleware.
Usar Postman o Thunder Client para probar POST.
Mostrar cómo el body llega al servidor.

---

## Parámetros de ruta

```js
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }

  res.json(post);
});
```

Note:
Explicar `:id` como parámetro dinámico.
Probar con Postman: /posts/1, /posts/999.
Mostrar el status 404.

---

## Probar con fetch desde React

```jsx
fetch('http://localhost:3000/posts')
  .then(res => res.json())
  .then(data => setPosts(data));
```

Note:
Recordar a los estudiantes que pueden hacer fetch desde su frontend.
Mostrar CORS si da error y explicar brevemente.
Conectar con la clase de useEffect de la semana 1.

---

## Ejercicio

Crea las siguientes rutas para tu blog:

1. `GET /posts` → lista de posts.
2. `GET /posts/:id` → un post por ID.
3. `POST /posts` → crear post.
4. `GET /users` → lista de usuarios.
5. `POST /users` → crear usuario.

Usa arrays en memoria para los datos.

Note:
Dar tiempo para completar.
Caminar y ayudar con dudas.
Ejecutar y probar cada endpoint.

---

# Resumen

- Express es el framework más popular para Node.js.
- `app.get`, `app.post` definen rutas.
- `express.json()` permite leer req.body.
- Los arrays en memoria sirven para prototipos.
- Próxima clase: CRUD completo con persistencia.

Note:
Preguntar dudas.
Adelantar que en la siguiente clase haremos CRUD completo.
