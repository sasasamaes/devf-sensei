---
title: Introducción al Backend y API REST
duration: 90
sessionId: modulo-7--lesson-7-4
---

# Backend y API REST

¿Qué hay detrás de una aplicación web?

- Frontend = lo que ves.
- Backend = lo que procesa tus datos.
- API = el puente entre ambos.

Note:
Preguntar: ¿cómo creen que Instagram sabe qué posts mostrar?
Introducir el concepto de cliente-servidor.

---

## ¿Qué es un backend?

El backend es el cerebro de la aplicación.

- Recibe peticiones del frontend.
- Procesa lógica de negocio.
- Lee y escribe en la base de datos.
- Devuelve respuestas.

```
Frontend (React)  →  HTTP Request  →  Backend (Server)
Frontend (React)  ←  JSON Response  ←  Backend (Server)
```

Note:
Dibujar el diagrama en pizarra.
Explicar que el frontend y backend son programas separados.

---

## ¿Qué es una API REST?

REST = Representational State Transfer.

Es una forma estándar de estructurar APIs.

Recursos (cosas sobre las que operamos):
- `/posts` → artículos del blog.
- `/users` → usuarios.
- `/comments` → comentarios.

Note:
Comparar con una biblioteca: los libros son recursos y hay formas estándar de pedirlos.

---

## Verbos HTTP

| Método | Acción | Ejemplo |
|--------|--------|---------|
| GET | Leer | `GET /posts` |
| POST | Crear | `POST /posts` |
| PUT | Actualizar | `PUT /posts/1` |
| DELETE | Borrar | `DELETE /posts/1` |

Note:
Hacer una analogía con CRUD en Excel.
Preguntar a los estudiantes qué método usarían para cada acción.

---

## Endpoints del blog

```
GET    /posts        → Listar artículos
GET    /posts/1      → Ver detalle
POST   /posts        → Crear artículo
PUT    /posts/1      → Actualizar
DELETE /posts/1      → Eliminar
POST   /login        → Iniciar sesión
POST   /register     → Registrarse
```

Note:
Dibujar estos endpoints en la pizarra.
Discutir qué datos viajarían en cada petición.

---

## JSON: el idioma de las APIs

```json
{
  "id": 1,
  "title": "Mi primer post",
  "content": "Este es el contenido...",
  "author": "Ana",
  "createdAt": "2025-04-01"
}
```

JSON es el formato de intercambio.

- Frontend envía JSON.
- Backend responde con JSON.

Note:
Mostrar cómo luce un JSON en el navegador.
Usar jsonplaceholder.typicode.com para ver datos reales.

---

## Actividad: Maqueta de endpoints

Dibujen los endpoints de su blog:

1. Listar posts.
2. Ver un post.
3. Crear post.
4. Actualizar post.
5. Eliminar post.
6. Login.
7. Registro.

Usen esta estructura:

```
MÉTODO /ruta → ¿Qué hace? → ¿Qué datos necesita?
```

Note:
Hacer que dibujen en papel o Figma.
Revisar en grupo y discutir inconsistencias.
Usar Postman para probar GET contra jsonplaceholder.

---

# Resumen

- Backend procesa datos y sirve respuestas.
- REST organiza las rutas como recursos.
- Verbos HTTP: GET, POST, PUT, DELETE.
- JSON es el formato de intercambio.
- En la siguiente clase: montaremos un servidor con Express.

Note:
Adelantar que la siguiente clase es práctica: crearán su primer servidor.
Preguntar dudas antes de cerrar.
