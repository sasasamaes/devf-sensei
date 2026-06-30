export const scriptDetails: Record<string, { time: string; details: string }[]> = {
  'lesson-7-1': [
    {
      "time": "0:00-0:10",
      "details": `Explicar la diferencia entre:
- Input no controlado: el DOM es la fuente de verdad, usamos defaultValue
- Input controlado: React es la fuente de verdad, usamos value + onChange

Pregunta clave: ¿Quién tiene el control del valor del input, el DOM o React?

Código para escribir en el editor en vivo:

\`\`\`jsx
// No controlado
function Uncontrolled() {
  return <input type="text" defaultValue="Hola" />;
}

// Controlado
function Controlled() {
  const [name, setName] = useState('');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
\`\`\``
    },
    {
      "time": "0:10-0:20",
      "details": `Preguntar a los estudiantes: ¿Han creado un formulario en React antes? ¿Qué problemas encontraron?

Problemas comunes que deben identificar:
- Tener que escribir un onChange y un useState para cada input
- La validación queda dispersa entre varios lugares del componente
- El código se vuelve difícil de escalar cuando hay muchos campos
- Los mensajes de error requieren lógica adicional

Mostrar un ejemplo de formulario manual con 3 campos para que vean cuánto código se necesita.`
    },
    {
      "time": "0:20-0:35",
      "details": `Paso 1: Instalar la librería
\`\`\`bash
npm install react-hook-form
\`\`\`

Paso 2: Importar y usar useForm
\`\`\`jsx
import { useForm } from 'react-hook-form';

function PostForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: true })} />
      {errors.title && <span>El título es requerido</span>}
      <button type="submit">Guardar</button>
    </form>
  );
}
\`\`\`

Explicar cada concepto:
- register: conecta el input con React Hook Form
- handleSubmit: recibe los datos validados
- errors: objeto con los errores de validación

Mostrar en consola los datos del formulario al hacer submit.`
    },
    {
      "time": "0:35-0:50",
      "details": `Agregar más validaciones al formulario anterior:

\`\`\`jsx
<input
  {...register('email', {
    required: 'El email es obligatorio',
    pattern: {
      value: /\\S+@\\S+\\.\\S+/,
      message: 'Formato de email inválido',
    },
    minLength: {
      value: 5,
      message: 'Mínimo 5 caracteres',
    },
  })}
/>
{errors.email && <span>{errors.email.message}</span>}
\`\`\`

Explicar:
- required: el campo es obligatorio, acepta string como mensaje
- pattern: expresión regular para validar formato
- minLength / maxLength: longitud mínima/máxima
- Los mensajes personalizados mejoran la UX

Mostrar cómo se ve cada error en pantalla.`
    },
    {
      "time": "0:50-1:20",
      "details": `Los estudiantes deben crear un formulario de "nuevo post" con:
- Título: requerido, mínimo 5 caracteres
- Contenido: requerido, mínimo 20 caracteres
- Autor: requerido
- Mostrar errores de validación debajo de cada campo
- Al hacer submit, mostrar los datos en consola

Solución de referencia:

\`\`\`jsx
import { useForm } from 'react-hook-form';

function NewPostForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log('Post creado:', data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Título</label>
        <input {...register('title', {
          required: 'El título es obligatorio',
          minLength: { value: 5, message: 'Mínimo 5 caracteres' }
        })} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div>
        <label>Contenido</label>
        <textarea {...register('content', {
          required: 'El contenido es obligatorio',
          minLength: { value: 20, message: 'Mínimo 20 caracteres' }
        })} />
        {errors.content && <span>{errors.content.message}</span>}
      </div>
      <div>
        <label>Autor</label>
        <input {...register('author', { required: 'El autor es obligatorio' })} />
        {errors.author && <span>{errors.author.message}</span>}
      </div>
      <button type="submit">Crear Post</button>
    </form>
  );
}
\`\`\`

Recorrer el aula y resolver dudas.`
    },
    {
      "time": "1:20-1:25",
      "details": `Mostrar la solución de referencia en pantalla.
Preguntar:
- ¿Alguien encontró una forma diferente de hacerlo?
- ¿Qué validación fue la más complicada?
- ¿Cómo se siente comparado con hacerlo manual sin librería?`
    },
    {
      "time": "1:25-1:30",
      "details": `Resumen de lo aprendido:
- Inputs controlados: React maneja el estado del formulario
- React Hook Form simplifica register, handleSubmit y errors
- Validaciones con reglas y mensajes personalizados

Adelanto: En la siguiente clase vamos a consumir APIs.
Este formulario de nuevo post lo vamos a conectar con un backend real.
El console.log(data) que hicieron hoy será un fetch() la próxima clase.`
    }
  ],
  'lesson-7-2': [
    {
      "time": "0:00-0:10",
      "details": `Explicar que React tiene dos tipos de código:
- Renderizado: JSX puro, transforma estado en UI
- Efectos secundarios: cosas que pasan fuera del renderizado

Ejemplos de efectos secundarios:
- Llamar a una API (fetch)
- Suscripciones a eventos
- Manipular el DOM manualmente
- Temporizadores (setTimeout, setInterval)
- LocalStorage

Analogía: React primero pinta la UI, luego ejecuta los efectos. Como un restaurante: primero preparan el plato (render), luego lo sirven (efecto).

Preguntar: ¿Qué ejemplos de efectos secundarios se les ocurren en una app web?`
    },
    {
      "time": "0:10-0:25",
      "details": `Código para escribir en el editor en vivo:

\`\`\`jsx
import { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

Explicar paso a paso:
1. El componente se monta
2. React ejecuta el useEffect
3. Fetch obtiene datos de la API
4. setPosts actualiza el estado
5. React re-renderiza con los datos

¿Qué pasa si no ponemos el array vacío? → loop infinito.
Array vacío significa: ejecuta solo al montar.`
    },
    {
      "time": "0:25-0:35",
      "details": `Agregar estado de carga al ejemplo anterior:

\`\`\`jsx
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

if (loading) return <p className="text-center py-8">Cargando posts...</p>;
\`\`\`

Explicar:
- loading empieza en true
- Cuando los datos llegan, cambiamos a false
- Mientras tanto mostramos un mensaje o spinner
- Esto mejora la experiencia del usuario

Preguntar: ¿Qué otras formas de mostrar carga se les ocurren?`
    },
    {
      "time": "0:35-0:45",
      "details": `Agregar manejo de errores:

\`\`\`jsx
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      if (!res.ok) throw new Error('Error al cargar los posts');
      return res.json();
    })
    .then(data => {
      setPosts(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);

if (loading) return <p>Cargando...</p>;
if (error) return <p className="text-red-500">Error: {error}</p>;
\`\`\`

Probar: Cambiar la URL por una inválida y ver el error.
Explicar try/catch vs .catch() en promesas.
Discutir buenas prácticas de UX para errores.`
    },
    {
      "time": "0:45-1:20",
      "details": `Los estudiantes deben:
1. Mostrar lista de títulos de posts desde jsonplaceholder
2. Agregar estado de loading
3. Agregar manejo de errores
4. Al hacer clic en un post, mostrar el detalle (body del post)

Solución de referencia:

\`\`\`jsx
function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar');
        return res.json();
      })
      .then(data => {
        setPosts(data.slice(0, 10));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <button onClick={() => setSelected(post)}>
              {post.title}
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <div>
          <h3>{selected.title}</h3>
          <p>{selected.body}</p>
        </div>
      )}
    </div>
  );
}
\`\`\``
    },
    {
      "time": "1:20-1:25",
      "details": `Mostrar solución de referencia.
Preguntar:
- ¿Quién logró mostrar el detalle al hacer clic?
- ¿Cómo manejaron el estado del post seleccionado?
- ¿Alguien usó un modal para el detalle?`
    },
    {
      "time": "1:25-1:30",
      "details": `Resumen:
- useEffect ejecuta código después del render
- El array de dependencias controla cuándo se ejecuta
- Siempre manejar loading y errores
- Fetch + useState + useEffect = consumo de APIs

Adelanto: En la siguiente clase veremos Context API para compartir estado global. ¿Qué pasa si queremos que el usuario logueado esté disponible en toda la app?`
    }
  ],
  'lesson-7-3': [
    {
      "time": "0:00-0:10",
      "details": `Dibujar en pizarra o mostrar en código:

\`\`\`jsx
// Prop drilling: pasar user por cada nivel
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) {
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Sidebar user={user} />
      <Main user={user} />
    </div>
  );
}

function Header({ user, setUser }) {
  return <NavBar user={user} setUser={setUser} />;
}

function NavBar({ user, setUser }) {
  return <button onClick={() => setUser(null)}>Salir</button>;
}
\`\`\`

Problemas:
- Componentes intermedios reciben props que no usan
- Si agregamos un nivel más, hay que modificar todos los intermediarios
- El código se vuelve difícil de mantener

Preguntar: ¿Han tenido que pasar props 3+ niveles?`
    },
    {
      "time": "0:10-0:20",
      "details": `Código para escribir en el editor en vivo:

\`\`\`jsx
import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const ThemeContext = createContext();

// 2. Crear el Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consumir el contexto
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header className={theme}>
      <h1>Mi Blog</h1>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Cambiar a modo {theme === 'light' ? 'oscuro' : 'claro'}
      </button>
    </header>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}
\`\`\`

Explicar:
- createContext: crea un contenedor para el estado
- Provider: envuelve componentes hijos y provee el valor
- useContext: accede al valor desde cualquier componente hijo`
    },
    {
      "time": "0:20-0:35",
      "details": `Ahora construimos el UserContext:

\`\`\`jsx
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email) => {
    setUser({
      email,
      name: email.split('@')[0],
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
\`\`\`

Explicar:
- user empieza como null (no autenticado)
- login recibe un email y crea un objeto de usuario
- logout vuelve user a null
- El login es simulado, no hay backend aún

Preguntar: ¿Qué otros datos debería tener el usuario?`
    },
    {
      "time": "0:35-0:45",
      "details": `Mostrar cómo consumir UserContext desde cualquier componente:

\`\`\`jsx
function NavBar() {
  const { user, login, logout } = useContext(UserContext);

  if (!user) {
    return (
      <nav>
        <span>Mi Blog</span>
        <button onClick={() => login('alumno@devf.com')}>
          Iniciar sesión
        </button>
      </nav>
    );
  }

  return (
    <nav>
      <span>Mi Blog</span>
      <span>Bienvenido, {user.name}</span>
      <button onClick={logout}>Cerrar sesión</button>
    </nav>
  );
}

function CreatePostButton() {
  const { user } = useContext(UserContext);
  if (!user) return null;
  return <button>Nuevo Post</button>;
}
\`\`\`

Punto clave: El mismo contexto se consume en cualquier componente, sin importar qué tan lejos esté.

Discutir: ¿Cuándo conviene tener contextos separados vs uno solo grande?`
    },
    {
      "time": "0:45-0:55",
      "details": `Agregar persistencia al UserProvider:

\`\`\`jsx
// Al cargar, recuperar sesión guardada
useEffect(() => {
  const saved = localStorage.getItem('user');
  if (saved) {
    setUser(JSON.parse(saved));
  }
}, []);

// Cuando user cambia, guardar o limpiar
useEffect(() => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}, [user]);
\`\`\`

Probar:
1. Hacer login
2. Recargar la página
3. El usuario sigue autenticado

Preguntar: ¿Qué pasa si no usamos localStorage?
- Al recargar, el estado de React se pierde
- localStorage persiste entre recargas

Advertencia: No guardar datos sensibles (tokens, passwords) en localStorage.`
    },
    {
      "time": "0:55-1:25",
      "details": `Los estudiantes deben:
1. Crear UserProvider con estado, login y logout
2. Crear NavBar que cambia según el usuario autenticado
3. Agregar persistencia con localStorage
4. Solo usuarios logueados ven el botón "Nuevo post"

Solución de referencia:

\`\`\`jsx
// UserContext.jsx
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = (email) => {
    setUser({ email, name: email.split('@')[0] });
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
\`\`\`

Recorrer el aula y ayudar con:
- Errores de importación
- Dónde colocar el Provider
- Cómo consumir el contexto en múltiples componentes`
    },
    {
      "time": "1:25-1:30",
      "details": `Resumen:
- Context API resuelve el prop drilling
- Tres pasos: createContext, Provider, useContext
- El estado de sesión es el caso de uso ideal
- localStorage persiste la sesión entre recargas

Adelanto: En la siguiente clase veremos qué es un backend y cómo funciona una API REST.`
    }
  ],
  'lesson-7-4': [
    {
      "time": "0:00-0:10",
      "details": `Dibujar en pizarra:

\`\`\`
[Frontend React] ──HTTP Request──> [Backend Server]
[Frontend React] <──JSON Response── [Backend Server]
                                     └── [Base de Datos]
\`\`\`

Explicar:
- Frontend: lo que el usuario ve (React, HTML, CSS)
- Backend: procesa peticiones, ejecuta lógica, accede a datos
- API: el puente entre frontend y backend

Preguntar: ¿Cómo creen que Instagram sabe qué posts mostrar?
- El frontend pide los posts
- El backend busca en la base de datos
- El backend responde con los datos
- El frontend los muestra`
    },
    {
      "time": "0:10-0:20",
      "details": `REST = Representational State Transfer

Analogía de la biblioteca:
- Los recursos son como los libros
- Cada libro tiene un identificador único
- Hay formas estándar de pedir libros (verbos)

Recursos en nuestro blog:
- /posts → artículos del blog
- /users → usuarios
- /comments → comentarios

Mal: /crearPost, /obtenerPost, /eliminarPost
Bien: POST /posts, GET /posts, DELETE /posts/1

Preguntar: ¿Qué otros recursos se les ocurren para un blog?`
    },
    {
      "time": "0:20-0:35",
      "details": `Los 4 verbos principales:

GET   → Leer (Read)
POST  → Crear (Create)
PUT   → Actualizar (Update)
DELETE → Eliminar (Delete)

Analogía CRUD en Excel:
- Read: abrir la hoja y mirar los datos
- Create: agregar una nueva fila
- Update: modificar una celda existente
- Delete: eliminar una fila

Preguntar: ¿Qué método usarían para...?
- Ver el perfil de un usuario → GET /users/1
- Registrarse en la app → POST /register
- Cambiar la contraseña → PUT /users/1/password
- Eliminar una cuenta → DELETE /users/1`
    },
    {
      "time": "0:35-0:45",
      "details": `Dibujar en pizarra los endpoints del blog:

GET    /posts      → Listar artículos
GET    /posts/1    → Ver detalle
POST   /posts      → Crear artículo
PUT    /posts/1    → Actualizar
DELETE /posts/1    → Eliminar
POST   /login      → Iniciar sesión
POST   /register   → Registrarse

Discutir:
- ¿Por qué POST /login y no GET /login?
- ¿Qué datos irían en cada petición?
- ¿Qué debería devolver cada endpoint?`
    },
    {
      "time": "0:45-0:55",
      "details": `Abrir en el navegador: https://jsonplaceholder.typicode.com/posts

Mostrar la estructura JSON:

\`\`\`json
[
  {
    "id": 1,
    "title": "sunt aut facere...",
    "body": "quia et suscipit...",
    "userId": 1
  }
]
\`\`\`

Puntos clave:
- JSON es texto, no código
- Objetos con llaves { }, arreglos con corchetes [ ]
- Las llaves son strings
- JSON.parse() para convertir a objeto JS
- JSON.stringify() para convertir a string JSON

Mostrar en consola del navegador:
\`\`\`js
const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json());
console.log(posts[0]);
\`\`\``
    },
    {
      "time": "0:55-1:20",
      "details": `Los estudiantes dibujan endpoints de su blog:

MÉTODO /ruta → ¿Qué hace? → ¿Qué datos necesita? → ¿Qué responde?

Ejemplo:
GET /posts → Listar → Nada → [{ id, title, content, author }]
POST /posts → Crear → { title, content, author } → { id, title, ... }

Endpoints a definir:
1. Listar posts
2. Ver un post
3. Crear post
4. Actualizar post
5. Eliminar post
6. Login
7. Registro

Pueden hacerlo en papel, Figma o una tabla.`
    },
    {
      "time": "1:20-1:25",
      "details": `Revisar los endpoints que hicieron los estudiantes.
Preguntar:
- ¿Alguien usó rutas con acciones (ej: /crearPost)?
- ¿Todos tienen los mismos endpoints?
- HTTP status codes: 200, 201, 400, 404, 500`
    },
    {
      "time": "1:25-1:30",
      "details": `Resumen:
- Backend procesa datos, frontend los muestra
- REST organiza rutas como recursos
- Verbos HTTP: GET, POST, PUT, DELETE
- JSON es el formato de intercambio

Adelanto: En la siguiente clase vamos a montar nuestro primer servidor con Node.js y Express.`
    }
  ],
  'lesson-7-5': [
    {
      "time": "0:00-0:10",
      "details": `Hacer la instalación en vivo:

\`\`\`bash
mkdir blog-backend
cd blog-backend
npm init -y
npm install express
\`\`\`

Explicar cada comando:
- npm init -y: crea package.json
- npm install express: descarga Express

Crear archivo index.js: touch index.js`
    },
    {
      "time": "0:10-0:20",
      "details": `Escribir en index.js:

\`\`\`js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.listen(PORT, () => {
  console.log(\`Servidor en http://localhost:\${PORT}\`);
});
\`\`\`

Explicar cada línea y ejecutar:
\`\`\`bash
node index.js
\`\`\`

Abrir http://localhost:3000`
    },
    {
      "time": "0:20-0:30",
      "details": `Agregar endpoint:

\`\`\`js
app.get('/posts', (req, res) => {
  const posts = [
    { id: 1, title: 'Primer post', content: 'Hola mundo' },
    { id: 2, title: 'Segundo post', content: 'Aprendiendo Express' },
  ];
  res.json(posts);
});
\`\`\`

res.json() convierte JS a JSON automáticamente.
Probar: http://localhost:3000/posts`
    },
    {
      "time": "0:30-0:40",
      "details": `Antes de POST, necesitamos middleware:

\`\`\`js
app.use(express.json());

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  res.status(201).json(newPost);
});
\`\`\`

Probar con fetch en consola:
\`\`\`js
fetch('http://localhost:3000/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Test', content: 'Contenido' })
}).then(r => r.json()).then(console.log)
\`\`\``
    },
    {
      "time": "0:40-0:50",
      "details": `Endpoint con parámetro dinámico:

\`\`\`js
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }
  res.json(post);
});
\`\`\`

- :id es parámetro dinámico
- req.params.id accede al valor
- posts.find() busca en el array
- 404 si no existe

Probar: /posts/1 funciona, /posts/999 da 404`
    },
    {
      "time": "0:50-1:20",
      "details": `Los estudiantes deben crear:

1. GET /posts → lista de posts
2. GET /posts/:id → un post por ID
3. POST /posts → crear post
4. GET /users → lista de usuarios
5. POST /users → crear usuario

Caminar por el aula y ayudar con:
- Errores de sintaxis
- Olvidar express.json()
- No reiniciar el servidor (Ctrl+C y node index.js)`
    },
    {
      "time": "1:20-1:25",
      "details": `Probar cada endpoint en grupo.
Preguntar:
- ¿Qué pasa si no reinician el servidor?
- ¿En qué se diferencia GET de POST?
- ¿Qué problemas encontraron?`
    },
    {
      "time": "1:25-1:30",
      "details": `Resumen:
- Express permite crear servidores con Node.js
- app.get, app.post definen rutas
- express.json() permite leer req.body
- Arrays en memoria sirven para prototipar

Adelanto: CRUD completo con PUT y DELETE en la siguiente clase.`
    }
  ],
  'lesson-7-6': [
    {
      "time": "0:00-0:10",
      "details": `Repaso de verbos HTTP:

CREATE → POST   /posts
READ   → GET    /posts, GET /posts/:id
UPDATE → PUT    /posts/:id
DELETE → DELETE /posts/:id

Setup:

\`\`\`js
const express = require('express');
const app = express();
app.use(express.json());

let posts = [
  { id: 1, title: 'Introducción', content: 'Primer post' },
  { id: 2, title: 'Express', content: 'Aprendiendo rutas' },
];
let nextId = 3;
\`\`\``
    },
    {
      "time": "0:10-0:20",
      "details": `GET /posts y GET /posts/:id:

\`\`\`js
app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'No encontrado' });
  }
  res.json(post);
});
\`\`\`

GET no modifica datos, es "seguro".`
    },
    {
      "time": "0:20-0:30",
      "details": `\`\`\`js
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  const newPost = {
    id: nextId++,
    title, content: content || '',
    author: author || 'Anónimo',
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});
\`\`\`

Validación de campos, 400 Bad Request, 201 Created.`
    },
    {
      "time": "0:30-0:40",
      "details": `\`\`\`js
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
\`\`\`

Actualización parcial, buscar por ID, modificar in-place.`
    },
    {
      "time": "0:40-0:50",
      "details": `\`\`\`js
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'No encontrado' });
  }
  posts.splice(index, 1);
  res.status(204).send();
});
\`\`\`

204 No Content, splice elimina del array.

Probar flujo completo:
POST → crear, GET → listar, PUT → actualizar, DELETE → eliminar`
    },
    {
      "time": "0:50-1:20",
      "details": `Implementar CRUD de usuarios:
1. POST /users → crear con email requerido
2. GET /users → listar
3. PUT /users/:id → actualizar
4. DELETE /users/:id → eliminar
Validaciones: email requerido, nombre mínimo 3 caracteres

Recorrer el aula y ayudar con validaciones.`
    },
    {
      "time": "1:20-1:25",
      "details": `Probar endpoints de usuarios en grupo.
Preguntar:
- ¿Qué pasa si crean usuario sin email?
- ¿Y con nombre de 1 carácter?
- ¿Por qué es importante validar?`
    },
    {
      "time": "1:25-1:30",
      "details": `Resumen:
- CRUD completo: Create, Read, Update, Delete
- GET no modifica; POST, PUT, DELETE sí
- Status codes: 200, 201, 204, 400, 404

Adelanto: En la siguiente clase conectaremos con Supabase (base de datos real).`
    }
  ],
  'lesson-7-7': [
    {
      "time": "0:00-0:10",
      "details": `Demostración del problema:
1. Crear posts via POST /posts
2. GET /posts → existen
3. Ctrl+C, node index.js (reiniciar)
4. GET /posts → datos perdidos

Los arrays en memoria se pierden al reiniciar el servidor. Necesitamos persistencia real.`
    },
    {
      "time": "0:10-0:20",
      "details": `Comparativa:

Supabase → PostgreSQL (SQL), REST + Realtime
Firebase → Firestore (NoSQL), SDK propietario

Usamos Supabase porque SQL es estándar en la industria.`
    },
    {
      "time": "0:20-0:30",
      "details": `Paso a paso:
1. https://supabase.com → New project
2. Nombre: blog-devf
3. Crear tabla posts:

\`\`\`sql
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'Anónimo',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\``
    },
    {
      "time": "0:30-0:40",
      "details": `Desde el frontend:

\`\`\`js
const SUPABASE_URL = 'https://[project].supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJ...';

const response = await fetch(\`\${SUPABASE_URL}/rest/v1/posts\`, {
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: \`Bearer \${SUPABASE_KEY}\`,
  },
});
const posts = await response.json();
\`\`\`

Es el mismo fetch que ya conocen, solo cambian URL y headers.`
    },
    {
      "time": "0:40-0:50",
      "details": `CRUD contra Supabase:

\`\`\`js
// POST - Crear
fetch(\`\${SUPABASE_URL}/rest/v1/posts\`, {
  method: 'POST',
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: \`Bearer \${SUPABASE_KEY}\`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
  body: JSON.stringify({ title, content }),
});

// DELETE
fetch(\`\${SUPABASE_URL}/rest/v1/posts?id=eq.\${id}\`, {
  method: 'DELETE',
  headers: { apikey: SUPABASE_KEY, Authorization: \`Bearer \${SUPABASE_KEY}\` },
});
\`\`\`

Realtime: mostrar dos pestañas con cambios en vivo.`
    },
    {
      "time": "0:50-1:25",
      "details": `Los estudiantes deben:
1. Crear tabla posts en Supabase
2. Configurar .env con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
3. Reemplazar backend local por Supabase
4. GET, POST, DELETE contra Supabase
5. (Opcional) Autenticación por email

\`\`\`
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJ...
\`\`\`

En Vite: import.meta.env.VITE_SUPABASE_URL`
    },
    {
      "time": "1:25-1:30",
      "details": `Resumen:
- Supabase: PostgreSQL + REST API + Realtime
- Reemplaza el backend local
- fetch funciona igual, solo cambia URL
- Auth por email con supabase.auth.signUp()

Adelanto: En la próxima clase haremos deploy a producción.`
    }
  ],
  'lesson-7-8': [
    {
      "time": "0:00-0:10",
      "details": `Diferencia: localhost (solo tu PC) vs producción (todo internet).

Preparar:

\`\`\`bash
npm run build
npx serve -s dist
\`\`\`

Verificar variables de entorno en .env`
    },
    {
      "time": "0:10-0:25",
      "details": `Opción 1: GitHub → Vercel
1. Subir a GitHub
2. vercel.com → Import repo
3. Agregar variables de entorno
4. Deploy

Opción 2: CLI
\`\`\`bash
npm i -g vercel
vercel --prod
\`\`\`

Cada push a main redeploy automáticamente.`
    },
    {
      "time": "0:25-0:35",
      "details": `Si usaron Supabase directo desde el frontend, no necesitan backend.
Si tienen Express aparte, deploy en Render (render.com).

Asegurar que Express use:
\`\`\`js
const PORT = process.env.PORT || 3000;
\`\`\``
    },
    {
      "time": "0:35-0:50",
      "details": `Los estudiantes prueban su app en producción:
- CRUD completo
- Autenticación
- Responsive
- Compartir link en Discord/Campus`
    },
    {
      "time": "0:50-1:05",
      "details": `Cada estudiante presenta (2 min):
1. URL del blog
2. Funcionalidades
3. Detalle favorito
4. Reto superado

Ambiente de celebración.`
    },
    {
      "time": "1:05-1:20",
      "details": `¿Qué aprendimos?
1. Formularios controlados y React Hook Form
2. Consumo de APIs con useEffect
3. Estado global con Context API
4. Backend y API REST
5. Servidor con Express
6. CRUD completo
7. Base de datos con Supabase
8. Deploy a producción

Preguntas de reflexión:
- ¿Qué fue lo más difícil?
- ¿Qué fue lo más divertido?
- ¿En qué área te gustaría profundizar?`
    },
    {
      "time": "1:20-1:30",
      "details": `Han construido un blog full-stack desde cero.
Esto es exactamente lo que se hace en la industria.

Felicitaciones por completar React Avanzado.
El portafolio comienza aquí.

Anunciar módulo 8 y responder preguntas finales.`
    }
  ]
};
