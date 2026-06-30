---
title: Consumo de APIs con useEffect
duration: 90
sessionId: modulo-7--lesson-7-2
---

# Consumo de APIs

Conectar React con datos externos.

- Las aplicaciones modernas consumen servicios.
- Los datos cambian y la UI debe reaccionar.
- `useEffect` es el lugar para efectos secundarios.

---

## ¿Qué es un efecto secundario?

Operaciones que ocurren fuera del renderizado:

- Llamadas a APIs.
- Suscripciones.
- Manipulación manual del DOM.
- Temporizadores.

Note:
Explicar que React pinta primero, luego ejecuta efectos.
Comparar con handlers que son reacciones directas a eventos.

---

## useEffect básico

```jsx
import { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

Note:
Explicar el array de dependencias vacío.
Mostrar el ciclo: montaje → efecto → actualización de estado → re-render.

---

## Manejo de loading

```jsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
      setPosts(data);
      setLoading(false);
    });
}, []);

if (loading) return <p>Cargando...</p>;
```

Note:
Explicar por qué el loading mejora la experiencia.
Pedir que agreguen loading a su ejercicio.

---

## Manejo de errores

```jsx
const [error, setError] = useState(null);

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      if (!res.ok) throw new Error('Error al cargar');
      return res.json();
    })
    .then(data => setPosts(data))
    .catch(err => setError(err.message));
}, []);

if (error) return <p>Error: {error}</p>;
```

Note:
Mostrar cómo simular un error cambiando la URL.
Discutir buenas prácticas de UX para errores.

---

## Ejercicio

Consume la API de posts y muestra:

1. Lista de títulos.
2. Estados de loading y error.
3. Al hacer clic, mostrar el detalle del post.

Note:
Dar tiempo para el ejercicio.
Conectar con el formulario de la clase anterior: crear posts.

---

# Resumen

- `useEffect` ejecuta efectos secundarios después del render.
- El array de dependencias controla cuándo se ejecuta.
- Siempre manejar loading y errores.
- Separar la lógica de fetch de la UI mejora la legibilidad.

Note:
Adelantar la siguiente clase: contexto global.
Preguntar si hay dudas.
