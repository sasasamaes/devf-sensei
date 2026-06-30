export const scriptDetails: Record<string, { time: string; details: string }[]> = {
  'lesson-7-1': [
    {
      "time": "0:00-0:10",
      "details": `Vamos a empezar con una pregunta: ¿Alguien ha creado un formulario en React antes?

La idea es entender la diferencia entre un input controlado y uno no controlado.

Un input no controlado es cuando dejamos que el DOM maneje el valor. Por ejemplo, si yo pongo un input con defaultValue, el valor lo guarda el navegador, no React.

Un input controlado es cuando React es el que guarda el valor del input en un estado, y nosotros le decimos qué mostrar.

Miren este ejemplo:

\`\`\`jsx
// No controlado: el DOM guarda el valor
<input type="text" defaultValue="Hola" />

// Controlado: React guarda el valor
const [name, setName] = useState('');
<input value={name} onChange={e => setName(e.target.value)} />
\`\`\`

En el controlado, cada vez que el usuario escribe, se ejecuta setName, se actualiza el estado, y React re-renderiza el input con el nuevo valor. React es la fuente de verdad.

Pregunta: ¿Por qué creen que esto es importante? Porque si React no controla los inputs, no podemos validar, no podemos mostrar errores, no podemos tener feedback en tiempo real.`
    },
    {
      "time": "0:10-0:20",
      "details": `Ahora, ¿qué problemas tienen los formularios cuando los hacemos manualmente?

Piénsenlo. Si tienen que hacer un formulario con 5 campos, ¿qué tienen que escribir?

Tienen que crear un useState para cada campo. Tienen que escribir un onChange para cada input. Tienen que manejar los errores uno por uno. Y la validación queda dispersa por todo el componente.

Por ejemplo, para un formulario de registro con nombre, email y contraseña, tendríamos tres useStates, tres onChanges, y lógica de validación separada para cada uno.

El código se vuelve difícil de escalar. Si después quieren agregar un campo más, tienen que replicar todo el patrón otra vez.

¿Les ha pasado? ¿Han tenido un formulario que se les hizo muy largo o complicado?

Hoy vamos a ver una librería que resuelve todo esto: React Hook Form.`
    },
    {
      "time": "0:20-0:35",
      "details": `Vamos a instalar React Hook Form.

\`\`\`bash
npm install react-hook-form
\`\`\`

Ya que se instaló, vamos a usarlo.

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

Vamos por partes. useForm nos da tres cosas importantes:

Primero, register. Register conecta el input con React Hook Form. Cuando hacemos {...register('title')}, le estamos diciendo a la librería: "este input se llama title, encárgate de él".

Segundo, handleSubmit. handleSubmit recibe los datos del formulario ya validados. Solo se ejecuta si todos los campos pasan la validación.

Tercero, errors. errors es un objeto que contiene los errores de validación de cada campo. Si un campo no pasa la validación, aparece aquí.

Muy importante: fíjense que ya no necesitamos useState para cada input. React Hook Form maneja el estado interno.

Vamos a probarlo. Abran la consola y hagan submit. Vean cómo aparecen los datos.`
    },
    {
      "time": "0:35-0:50",
      "details": `Ahora vamos a ver las validaciones más comunes que podemos usar.

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

Fíjense en algo importante: en required le podemos pasar un string con el mensaje de error. Ya no tenemos que hacer if else para mostrar mensajes.

Lo mismo con pattern: le decimos qué expresión regular usar y qué mensaje mostrar si no cumple.

Y minLength: longitud mínima.

Lo genial es que cada error ya tiene su mensaje. Solo hacemos errors.email.message y mostramos lo que configuramos.

Pregunta: ¿Qué otras validaciones se les ocurren que podríamos necesitar? Por ejemplo, validar que la contraseña tenga al menos 8 caracteres, o que el nombre de usuario no tenga espacios.`
    },
    {
      "time": "0:50-1:20",
      "details": `Vamos a hacer un ejercicio.

Tienen que crear un formulario de "nuevo post" con las siguientes validaciones:

Primero, un campo Título, que sea requerido y que tenga mínimo 5 caracteres.
Segundo, un campo Contenido, requerido con mínimo 20 caracteres.
Tercero, un campo Autor, requerido.
Y tienen que mostrar los errores de validación debajo de cada campo.

Al hacer submit, deben mostrar los datos en consola.

Tienen 20 minutos. Yo voy a ir pasando por los asientos para ayudar.

Cuando terminen o se atoren, me llaman.

Si alguien termina rápido, que le agregue validación de email y que el botón de submit se deshabilite mientras hay errores.

\textit{Recorrer el aula y resolver dudas.}`
    },
    {
      "time": "1:20-1:25",
      "details": `Vamos a revisar la solución.

La estructura es esta:

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

Preguntas: ¿Alguien encontró una forma diferente de hacerlo? ¿Qué validación fue la más complicada?

Compartan sus pantallas si quieren mostrar cómo les quedó.`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar la clase de hoy.

Vimos tres cosas importantes:

Primero, la diferencia entre inputs controlados y no controlados. En React, siempre vamos a usar controlados porque queremos que React sea la fuente de verdad.

Segundo, React Hook Form nos simplifica la vida. Con register, handleSubmit y errors podemos manejar formularios completos sin necesidad de useStates ni onChanges manuales.

Tercero, las validaciones se configuran de manera declarativa. Le decimos a cada campo qué reglas debe cumplir y la librería se encarga del resto.

Este formulario de nuevo post que hicieron hoy va a ser importante. En las siguientes clases lo vamos a conectar con un backend real para guardar los posts en una base de datos.

El console.log que hicieron hoy se va a convertir en un fetch.

Para la casa: si no terminaron el ejercicio, termínenlo. Y si quieren adelantar, lean la documentación de React Hook Form.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-7-2': [
    {
      "time": "0:00-0:10",
      "details": `Vamos a empezar con un concepto importante: los efectos secundarios en React.

¿Qué es un efecto secundario? Es todo el código que no es parte del renderizado.

React se encarga de renderizar la interfaz basada en el estado. Pero hay cosas que no pueden pasar durante el renderizado.

Por ejemplo:
- Llamar a una API para traer datos
- Leer o escribir en localStorage
- Usar timers como setTimeout o setInterval
- Manipular el DOM manualmente

Todo eso son efectos secundarios.

La analogía que me gusta usar es la de un restaurante. Primero el cocinero prepara el plato, eso es el renderizado. Y luego el mesero lo lleva a la mesa, eso es el efecto secundario. React primero renderiza y después ejecuta los efectos.

Pregunta: ¿Qué otros ejemplos de efectos secundarios se les ocurren en una aplicación web?`
    },
    {
      "time": "0:10-0:25",
      "details": `Vamos a escribir nuestro primer efecto secundario: consumir una API.

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

Vamos paso a paso.

Primero, tenemos un estado posts que empieza como un arreglo vacío.

Luego, tenemos un useEffect. El useEffect recibe dos cosas: una función y un arreglo de dependencias.

La función se ejecuta después de que React renderiza el componente. Aquí hacemos fetch a la API de jsonplaceholder, convertimos la respuesta a JSON, y actualizamos el estado con setPosts.

El arreglo vacío al final significa: "ejecuta esto solo la primera vez que el componente se monta".

¿Qué pasa si no ponemos el arreglo vacío? Se ejecuta en cada render, y como actualiza el estado, causa otro render, y otro fetch, y otro render... un loop infinito.

El ciclo es: el componente se monta, React ejecuta el efecto, el fetch trae datos, setPosts actualiza el estado, React re-renderiza con los datos nuevos.`
    },
    {
      "time": "0:25-0:35",
      "details": `Ahora vamos a mejorar la experiencia del usuario con un estado de carga.

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

if (loading) return <p>Cargando posts...</p>;
\`\`\`

Fíjense en el flujo: loading empieza en true. Mientras loading es true, mostramos un mensaje de carga. Cuando los datos llegan, cambiamos loading a false y se muestra la lista.

Esto es importante porque sin el loading, el usuario ve una pantalla en blanco mientras llegan los datos y no sabe qué está pasando.

Pregunta: ¿Qué otras formas de mostrar carga se les ocurren? Podemos usar un spinner, un skeleton, una barra de progreso... La idea es siempre informar al usuario que algo está pasando.`
    },
    {
      "time": "0:35-0:45",
      "details": `Y ahora el manejo de errores, que es igual de importante.

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

Vamos a probar algo. Cambien la URL por una que no exista, por ejemplo una con un typo. Van a ver que aparece el mensaje de error.

Cosas importantes: primero validamos que la respuesta sea ok. Si el servidor devuelve un error 404 o 500, fetch no lo rechaza automáticamente, tenemos que verificarlo con res.ok.

Segundo, el .catch atrapa cualquier error que ocurra, ya sea de red o de validación.

Tercero, mostramos el error al usuario para que sepa qué pasó.

Esto es buena práctica: siempre mostrar algo al usuario, ya sea carga, datos o error. Nunca dejar una pantalla en blanco.`
    },
    {
      "time": "0:45-1:20",
      "details": `Ejercicio: Van a consumir la API de posts de jsonplaceholder.

Tienen que hacer lo siguiente:

Primero, mostrar una lista con los títulos de los posts.

Segundo, agregar un estado de loading.

Tercero, agregar manejo de errores.

Y cuarto, la parte interesante: cuando hagan clic en un post, debe mostrar el detalle de ese post, o sea el body o contenido del post.

Tienen 25 minutos. Yo voy a ir pasando.

Si alguien termina rápido, que agregue un botón para volver a la lista cuando están viendo el detalle.

\textit{Recorrer el aula y resolver dudas.}`
    },
    {
      "time": "1:20-1:25",
      "details": `Vamos a revisar la solución.

La estructura es tener un estado selected que empieza como null. Cuando hacen clic en un post, asignan ese post a selected. Y si selected tiene un valor, muestran el detalle en lugar de la lista.

Preguntas: ¿Quién logró mostrar el detalle al hacer clic? ¿Cómo manejaron el estado del post seleccionado? ¿Alguien usó un modal para mostrar el detalle?

Compartan cómo les quedó.`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar.

Hoy vimos:
- useEffect ejecuta código después del render
- El arreglo de dependencias controla cuándo se ejecuta el efecto
- Siempre debemos manejar loading y errores cuando trabajamos con APIs
- El patrón fetch + useState + useEffect es la base del consumo de APIs en React

En la siguiente clase vamos a ver Context API, que nos va a permitir compartir estado global entre componentes. Por ejemplo, si queremos que el usuario logueado esté disponible en toda la aplicación, sin tener que pasar props por todos los niveles.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-7-3': [
    {
      "time": "0:00-0:10",
      "details": `Vamos a hablar de un problema que seguro han enfrentado: el prop drilling.

Miren este código:

\`\`\`jsx
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

¿Ven el problema? El estado user empieza en App. Para que NavBar pueda usarlo, tiene que pasar por Layout, después por Header, y finalmente llega a NavBar.

Layout no necesita user, pero tiene que recibirlo porque Header lo necesita. Header no necesita setUser, pero tiene que recibirlo porque NavBar lo necesita.

Esto se llama prop drilling: pasar props a través de componentes intermedios que no las necesitan.

Los problemas son: los componentes intermedios reciben props que no usan, si agregamos un nivel más hay que modificar todos los intermediarios, y el código se vuelve difícil de mantener.

Pregunta: ¿Les ha pasado? ¿Han tenido que pasar props tres o más niveles hacia abajo?`
    },
    {
      "time": "0:10-0:20",
      "details": `La solución de React para esto se llama Context API.

Vamos a ver un ejemplo con un contexto de tema, que es más sencillo para entender el concepto.

\`\`\`jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

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

Tres pasos.

Primero, createContext crea un contenedor para el estado. Piensen en ello como un túnel que atraviesa el árbol de componentes.

Segundo, el Provider envuelve los componentes hijos. El Provider tiene una prop llamada value, que es lo que vamos a compartir. En este caso compartimos theme y setTheme.

Tercero, cualquier componente hijo puede usar useContext para acceder a ese valor. Sin importar qué tan profundo esté en el árbol.

Fíjense que Header ya no recibe props. Simplemente llama a useContext y tiene acceso directo al tema.`
    },
    {
      "time": "0:20-0:35",
      "details": `Ahora vamos a construir algo más útil: un contexto de usuario.

\`\`\`jsx
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

Fíjense en el patrón. user empieza como null, que significa "no hay usuario autenticado".

La función login recibe un email y crea un objeto con email y name. El name lo sacamos de la parte del email antes de la arroba. Por ahora es un login simulado, no estamos consultando ningún backend.

La función logout simplemente vuelve user a null.

Y el Provider comparte user, login y logout para que cualquier componente pueda usarlos.

Pregunta: ¿Qué otros datos debería tener el usuario? Podría tener un avatar, un rol, un id único... Todo eso lo agregarían aquí.`
    },
    {
      "time": "0:35-0:45",
      "details": `Ahora veamos cómo consumir este contexto desde cualquier componente.

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

Dos cosas importantes.

Uno: NavBar cambia completamente según si hay usuario o no. Si no hay usuario, muestra un botón de iniciar sesión. Si hay usuario, muestra el nombre y un botón de cerrar sesión.

Dos: el mismo contexto se puede consumir en múltiples componentes. NavBar lo usa para mostrar el estado, y CreatePostButton lo usa para decidir si mostrar el botón o no.

Y lo mejor: no importa qué tan lejos estén estos componentes en el árbol. Mientras estén dentro del Provider, tienen acceso.

Discutamos: ¿Cuándo conviene tener contextos separados? Por ejemplo, un contexto para el usuario y otro para el tema. En lugar de tener un solo contexto gigante con todo.`
    },
    {
      "time": "0:45-0:55",
      "details": `Ahora vamos a resolver un problema: si recargan la página, el estado de React se pierde y el usuario tiene que iniciar sesión otra vez.

Para eso usamos localStorage.

\`\`\`jsx
useEffect(() => {
  const saved = localStorage.getItem('user');
  if (saved) {
    setUser(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}, [user]);
\`\`\`

Dos efectos.

El primero se ejecuta cuando el componente se monta. Busca en localStorage si hay un usuario guardado. Si existe, lo restaura.

El segundo se ejecuta cada vez que user cambia. Si hay usuario, lo guarda en localStorage. Si no hay usuario, limpia localStorage.

Esto significa que si el usuario inicia sesión y recarga la página, sigue autenticado.

Vamos a probarlo. Inicien sesión, luego recarguen la página. ¿Ven? Sigue apareciendo el nombre del usuario.

Una advertencia importante: no guarden información sensible como tokens o contraseñas en localStorage. Para eso hay opciones más seguras como httpOnly cookies. Pero para el nombre de usuario y email, localStorage está bien.`
    },
    {
      "time": "0:55-1:25",
      "details": `Ejercicio: Van a implementar un contexto de usuario completo para su blog.

Los pasos son:

Primero, crear un UserProvider con estado, función login y función logout.

Segundo, crear un NavBar que muestre el botón de iniciar sesión cuando no hay usuario, y el nombre con botón de cerrar sesión cuando sí hay usuario.

Tercero, agregar persistencia con localStorage para que la sesión no se pierda al recargar.

Cuarto, asegurarse de que solo los usuarios logueados vean el botón de "Nuevo post".

Tienen 25 minutos. Yo voy a ir pasando.

\textit{Recorrer el aula y resolver dudas.}`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar la clase.

Hoy vimos:

Context API resuelve el problema del prop drilling. Con tres pasos: createContext para crear el contenedor, Provider para envolver componentes y compartir el valor, y useContext para consumir el valor desde cualquier componente.

El estado de sesión de usuario es el caso de uso ideal para Context. Permite que cualquier componente sepa si hay un usuario logueado sin tener que pasar props por todos los niveles.

LocalStorage nos permite persistir la sesión entre recargas de página.

En la siguiente clase vamos a cambiar de tema: vamos a entender qué es un backend y cómo funciona una API REST. Dejamos React por un momento para entender el lado del servidor.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-7-4': [
    {
      "time": "0:00-0:10",
      "details": `Hoy vamos a cambiar completamente de tema. Vamos a hablar del backend.

Hasta ahora todo lo que hemos hecho ha sido frontend: formularios, APIs, contextos... todo del lado del cliente.

Pero una aplicación web completa tiene dos partes. El frontend, que es lo que el usuario ve. Y el backend, que es el cerebro que procesa los datos.

Miren este diagrama:

\`\`\`
[Frontend React] ──HTTP Request──> [Backend Server]
[Frontend React] <──JSON Response── [Backend Server]
                                     └── [Base de Datos]
\`\`\`

El frontend le manda una petición al backend. El backend procesa esa petición, hace lo que tenga que hacer, consulta la base de datos si es necesario, y devuelve una respuesta. El frontend recibe la respuesta y actualiza la interfaz.

Pregunta: ¿Cómo creen que Instagram sabe qué posts mostrar cuando abren la app? El frontend de Instagram le pide los posts al backend de Instagram. El backend busca los posts en la base de datos. Y devuelve los datos en formato JSON para que el frontend los muestre.

Eso es exactamente lo que vamos a aprender a hacer.`
    },
    {
      "time": "0:10-0:20",
      "details": `Ahora, ¿cómo se comunican el frontend y el backend? A través de una API.

API significa Application Programming Interface. Es un conjunto de reglas que define cómo se comunican dos programas.

REST es un estilo de arquitectura para diseñar APIs. Es el más común hoy en día.

La idea clave de REST es que todo se organiza alrededor de recursos. Los recursos son las cosas sobre las que operamos.

En nuestro blog, los recursos son:
- /posts → los artículos del blog
- /users → los usuarios
- /comments → los comentarios

Una API REST organiza las rutas como recursos, no como acciones.

Por ejemplo, si yo quiero crear un post, no hago una ruta que se llame /crearPost. En REST, hago un POST a /posts.

Si quiero obtener los posts, no uso /obtenerPosts. Uso GET a /posts.

¿Ven la diferencia? Las rutas son sustantivos, no verbos. Los verbos son los métodos HTTP.

Pregunta: ¿Qué otros recursos se les ocurren para un blog? Por ejemplo, categorías, etiquetas...`
    },
    {
      "time": "0:20-0:35",
      "details": `Hablemos de los verbos HTTP. Son cuatro principales.

GET es para leer datos. Por ejemplo, GET /posts me da todos los posts. GET /posts/1 me da el post con ID 1.

POST es para crear datos. POST /posts crea un post nuevo. Los datos del nuevo post van en el body de la petición.

PUT es para actualizar datos. PUT /posts/1 actualiza el post con ID 1.

DELETE es para eliminar datos. DELETE /posts/1 elimina el post con ID 1.

Piensen en CRUD: Create, Read, Update, Delete. Create es POST, Read es GET, Update es PUT, Delete es DELETE.

Pregunta: ¿Qué método usarían para ver el perfil de un usuario? GET /users/1. ¿Para registrarse en la app? POST /register. ¿Para cambiar la contraseña? PUT /users/1/password. ¿Para eliminar una cuenta? DELETE /users/1.

¿Ven cómo funciona? Cada acción tiene su método y su ruta.`
    },
    {
      "time": "0:35-0:45",
      "details": `Vamos a definir los endpoints de nuestro blog.

Los endpoints son las rutas específicas que va a tener nuestra API.

Para posts:

GET /posts → listar todos los artículos
GET /posts/1 → ver detalle de un artículo
POST /posts → crear un artículo nuevo
PUT /posts/1 → actualizar un artículo existente
DELETE /posts/1 → eliminar un artículo

Para usuarios:

POST /login → iniciar sesión
POST /register → registrarse

Preguntas para discutir:

¿Por qué POST /login y no GET /login? Porque estamos enviando datos sensibles como el email y la contraseña. GET muestra los datos en la URL, POST los envía en el body.

¿Qué datos viajarían en cada petición? Por ejemplo, para crear un post necesitamos title, content y author. Para login necesitamos email y password.

¿Qué debería devolver cada endpoint? GET /posts debería devolver un arreglo de posts. GET /posts/1 debería devolver un solo post. POST /posts debería devolver el post creado con su ID.`
    },
    {
      "time": "0:45-0:55",
      "details": `Hablemos del formato en que se comunican: JSON.

Vamos a abrir esta URL en el navegador: https://jsonplaceholder.typicode.com/posts

Lo que ven es un JSON. Es texto, pero tiene una estructura.

Los objetos se escriben entre llaves { } y tienen pares de "llave": valor.
Los arreglos se escriben entre corchetes [ ].

Por ejemplo:

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

Las llaves siempre van entre comillas dobles. Los valores pueden ser strings, números, booleanos, objetos o arreglos.

En JavaScript, para convertir un JSON a objeto usamos JSON.parse. Y para convertir un objeto a JSON usamos JSON.stringify.

Vamos a probarlo en la consola del navegador:

\`\`\`js
const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json());
console.log(posts[0]);
\`\`\`

Ahí tienen: el frontend le pide datos al backend, el backend responde con JSON, y el frontend lo convierte en objetos de JavaScript.`
    },
    {
      "time": "0:55-1:20",
      "details": `Ahora vamos a hacer una actividad.

Van a dibujar los endpoints de su blog con esta estructura:

MÉTODO /ruta → ¿Qué hace? → ¿Qué datos necesita? → ¿Qué responde?

Por ejemplo:

GET /posts → Listar artículos → No necesita datos → Devuelve un arreglo de posts
POST /posts → Crear artículo → Recibe title, content, author → Devuelve el post creado con su ID

Los endpoints que tienen que definir son:
1. Listar posts
2. Ver un post
3. Crear post
4. Actualizar post
5. Eliminar post
6. Login
7. Registro

Pueden hacerlo en papel, en Figma, en una tabla de Excel, o donde quieran.

Tienen 15 minutos. Después revisamos en grupo.

\textit{Revisar en grupo y discutir inconsistencias.}`
    },
    {
      "time": "1:20-1:25",
      "details": `Vamos a revisar lo que hicieron.

Preguntas:

¿Alguien escribió rutas con acciones en lugar de recursos? Por ejemplo, /crearPost en lugar de POST /posts. Esto es un error común cuando empezamos.

¿Todos tienen los mismos endpoints? Si alguien tiene endpoints diferentes, ¿por qué?

¿Qué pasa si mandamos datos incorrectos al backend? El backend debería responder con un código de error. Por ejemplo, 400 Bad Request si faltan campos obligatorios.

Los códigos de estado HTTP más comunes son:
200 OK → todo funcionó bien
201 Created → se creó un recurso
400 Bad Request → la petición es incorrecta
404 Not Found → el recurso no existe
500 Internal Server Error → error del servidor`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar.

Hoy vimos que el backend es el cerebro de la aplicación: procesa peticiones, ejecuta lógica y accede a datos.

REST organiza las rutas como recursos (posts, users, comments) y usa los verbos HTTP (GET, POST, PUT, DELETE) para definir las acciones.

JSON es el formato de intercambio entre frontend y backend.

En la siguiente clase vamos a poner todo esto en práctica. Vamos a montar nuestro primer servidor con Node.js y Express. Van a escribir código de backend por primera vez.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-7-5': [
    {
      "time": "0:00-0:10",
      "details": `Hoy vamos a escribir nuestro primer servidor.

Van a abrir la terminal y vamos a crear un proyecto nuevo.

\`\`\`bash
mkdir blog-backend
cd blog-backend
npm init -y
npm install express
\`\`\`

Vamos paso a paso.

mkdir blog-backend crea la carpeta del proyecto.
cd blog-backend nos mete en esa carpeta.
npm init -y crea el archivo package.json con valores por defecto. Este archivo va a contener la configuración de nuestro proyecto.
npm install express descarga e instala Express en nuestro proyecto. Express es el framework que vamos a usar para crear el servidor.

Fíjense que se creó una carpeta node_modules. Ahí están todas las dependencias de Express. Y también se creó package-lock.json que bloquea las versiones de esas dependencias.

Ahora creamos el archivo principal:

\`\`\`bash
touch index.js
\`\`\`

Ahí vamos a escribir nuestro código.`
    },
    {
      "time": "0:10-0:20",
      "details": `Escriban esto en index.js:

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

Vamos línea por línea.

const express = require('express') importa la librería de Express.
const app = express() crea la aplicación. app es nuestro servidor.
const PORT = 3000 define el puerto donde va a escuchar.

app.get es una ruta. Recibe dos cosas: la ruta y una función callback. La ruta es '/', que es la raíz. El callback recibe req y res. req tiene los datos de la petición, res es lo que vamos a responder.

res.send('Servidor funcionando') envía una respuesta de texto.

app.listen inicia el servidor en el puerto 3000.

Ahora ejecutamos:

\`\`\`bash
node index.js
\`\`\`

Y abrimos http://localhost:3000 en el navegador. Tiene que decir "Servidor funcionando".

Acaban de crear su primer servidor web.`
    },
    {
      "time": "0:20-0:30",
      "details": `Ahora vamos a crear un endpoint que devuelva datos en JSON.

Agreguen esto después de app.get('/', ...):

\`\`\`js
app.get('/posts', (req, res) => {
  const posts = [
    { id: 1, title: 'Primer post', content: 'Hola mundo' },
    { id: 2, title: 'Segundo post', content: 'Aprendiendo Express' },
  ];
  res.json(posts);
});
\`\`\`

Dos cosas importantes.

Primero, res.json convierte el arreglo de JavaScript a JSON automáticamente. No tenemos que hacer JSON.stringify manualmente.

Segundo, los datos son estáticos, están escritos directamente en el código. Más adelante van a ser dinámicos.

Reinicien el servidor: Ctrl+C y otra vez node index.js.

Ahora vayan a http://localhost:3000/posts. Van a ver el JSON en el navegador.

¿Se acuerdan de jsonplaceholder? Esto es exactamente lo mismo. La diferencia es que ellos tienen miles de posts y nosotros tenemos dos. Pero la estructura es la misma.`
    },
    {
      "time": "0:30-0:40",
      "details": `Ahora vamos a crear un endpoint que reciba datos.

Primero necesitamos un middleware. Un middleware es una función que se ejecuta antes de las rutas. Pongan esto al principio, antes de las rutas:

\`\`\`js
app.use(express.json());
\`\`\`

express.json() le dice a Express: "cuando alguien envíe datos en formato JSON, conviértelos a JavaScript y ponlos en req.body".

Ahora el endpoint POST:

\`\`\`js
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: Date.now(),
    title,
    content,
  };
  res.status(201).json(newPost);
});
\`\`\`

req.body tiene los datos que envió el frontend. Usamos destructuring para sacar title y content.

Date.now() genera un número único basado en la fecha actual. Nos sirve como ID temporal.

res.status(201) establece el código de estado HTTP. 201 significa "Created", que es el código correcto cuando se crea un recurso.

Vamos a probarlo. Abran la consola del navegador y ejecuten:

\`\`\`js
fetch('http://localhost:3000/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Mi post desde el navegador', content: 'Contenido de prueba' })
}).then(r => r.json()).then(console.log)
\`\`\`

Devuelve el post creado con su ID y el status 201.`
    },
    {
      "time": "0:40-0:50",
      "details": `Vamos a crear un endpoint que reciba un parámetro en la URL.

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

Fíjense en la ruta: '/posts/:id'. Los dos puntos indican que id es un parámetro dinámico. Puede ser cualquier valor.

req.params.id accede al valor que viene en la URL. Si la URL es /posts/5, req.params.id es "5".

parseInt convierte ese string a número para poder compararlo con los IDs de nuestros posts.

posts.find busca en el arreglo un post que tenga ese ID.

Si no encuentra ninguno, respondemos con 404. El 404 es el código correcto para "no encontrado".

Vamos a probar: http://localhost:3000/posts/1 debería funcionar. http://localhost:3000/posts/999 debería dar error 404.`
    },
    {
      "time": "0:50-1:20",
      "details": `Ejercicio: Van a crear las siguientes rutas para su blog.

Primero, GET /posts que devuelva una lista de posts estáticos.

Segundo, GET /posts/:id que devuelva un post por ID.

Tercero, POST /posts que permita crear un post recibiendo datos del body.

Cuarto, GET /users que devuelva una lista de usuarios.

Quinto, POST /users que permita crear un usuario.

Tienen 25 minutos. Recuerden reiniciar el servidor cada vez que hagan cambios con Ctrl+C y node index.js.

Yo voy a ir pasando para ayudarlos.

\textit{Recorrer el aula.}`
    },
    {
      "time": "1:20-1:25",
      "details": `Vamos a revisar.

Preguntas:

¿Qué pasa si no reinician el servidor después de hacer cambios? Los cambios no se reflejan. Este es uno de los errores más comunes cuando empezamos con Node.js.

¿En qué se diferencia GET de POST? GET es para leer datos y los parámetros van en la URL. POST es para crear datos y los parámetros van en el body.

¿Qué problemas encontraron? ¿Alguien se olvidó de express.json()? Eso hace que req.body sea undefined, es un error muy común.`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar la clase de hoy.

Aprendimos que Express nos permite crear servidores con Node.js de manera sencilla.

app.get y app.post definen las rutas de nuestra API.

express.json() es un middleware necesario para poder leer el body de las peticiones POST.

Los arrays en memoria nos sirven para prototipar, pero los datos se pierden al reiniciar el servidor.

En la siguiente clase vamos a completar el CRUD: vamos a agregar PUT para actualizar y DELETE para eliminar.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-7-6': [
    {
      "time": "0:00-0:10",
      "details": `Vamos a completar el CRUD hoy. Ya tenemos GET y POST, nos faltan PUT y DELETE.

Primero, un repaso rápido. ¿Cuáles son los cuatro verbos HTTP?

CREATE → POST /posts
READ → GET /posts y GET /posts/:id
UPDATE → PUT /posts/:id
DELETE → DELETE /posts/:id

Vamos a empezar con el setup. Escriban esto:

\`\`\`js
const express = require('express');
const app = express();
app.use(express.json());

let posts = [
  { id: 1, title: 'Introducción', content: 'Primer post' },
  { id: 2, title: 'Express', content: 'Aprendiendo rutas' },
];

let nextId = 3;
\`\`\`

Fíjense que ahora tenemos un arreglo posts con datos iniciales y una variable nextId que empieza en 3. Cada vez que creemos un post, vamos a asignarle el valor de nextId y luego incrementarlo. Así nos aseguramos de que los IDs sean únicos y auto-incrementales.`
    },
    {
      "time": "0:10-0:20",
      "details": `Los endpoints GET los vimos la clase pasada, pero los repasamos:

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

GET es un método seguro, no modifica datos. Podemos llamarlo mil veces y siempre va a devolver lo mismo sin efectos secundarios.

GET /posts devuelve todos los posts.
GET /posts/:id busca uno por ID, y devuelve 404 si no existe.`
    },
    {
      "time": "0:20-0:30",
      "details": `Ahora POST con validación:

\`\`\`js
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
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
\`\`\`

Lo nuevo aquí es la validación. Antes de crear el post, verificamos que title y content existan. Si falta alguno, respondemos con 400 Bad Request.

nextId++ asigna el valor actual de nextId al post y luego lo incrementa. El primer post creado tendrá ID 3.

También agregamos valores por defecto: si no envían author, ponemos 'Anónimo'. Y guardamos la fecha de creación con new Date().toISOString().`
    },
    {
      "time": "0:30-0:40",
      "details": `PUT para actualizar:

\`\`\`js
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

PUT recibe un ID en la URL y los datos a actualizar en el body.

Buscamos el post por ID. Si no existe, 404.

Si existe, actualizamos solo los campos que vienen en el body. Si title está presente, actualizamos el título. Si content está presente, actualizamos el contenido.

Esto se llama actualización parcial: solo modificamos lo que nos envían.

Técnicamente PUT debería reemplazar todo el recurso, y PATCH se usa para actualizaciones parciales. Pero por simplicidad, estamos usando PUT con actualización parcial. En proyectos profesionales usen PATCH para esto.`
    },
    {
      "time": "0:40-0:50",
      "details": `DELETE para eliminar:

\`\`\`js
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

A diferencia de find que devuelve el elemento, findIndex devuelve la posición del elemento en el arreglo.

Si el índice es -1, significa que no lo encontró, 404.

Si lo encuentra, splice elimina el elemento en esa posición. splice(index, 1) dice: "elimina un elemento empezando en la posición index".

La respuesta es 204 No Content. Esto significa "la operación se completó exitosamente pero no hay contenido que devolver". Es el código estándar para DELETE.

Vamos a probar el flujo completo:

\`\`\`
POST /posts → crear { title: "Test", content: "..." }
GET /posts → aparece el nuevo
PUT /posts/3 → actualizar { title: "Editado" }
DELETE /posts/3 → eliminar
GET /posts → ya no aparece
\`\`\`


¿Por qué 204 y no 200? Porque después de eliminar, no hay nada que devolver. El 204 le dice al frontend: "todo bien, no esperes datos".`
    },
    {
      "time": "0:50-1:20",
      "details": `Ejercicio: Van a implementar el CRUD completo para usuarios.

Los endpoints son:

POST /users → crear usuario con email requerido
GET /users → listar usuarios
PUT /users/:id → actualizar usuario
DELETE /users/:id → eliminar usuario

Validaciones:
- email es requerido
- nombre debe tener mínimo 3 caracteres

Tienen 25 minutos. Yo voy a ir pasando.

\textit{Recorrer el aula y ayudar.}`
    },
    {
      "time": "1:20-1:25",
      "details": `Vamos a revisar.

Preguntas:

¿Qué pasa si intentan crear un usuario sin email? Debería dar 400 Bad Request.
¿Y con nombre de 1 carácter? También 400.
¿Por qué es importante validar? Porque si no validamos, pueden guardar datos incompletos o incorrectos en nuestra base de datos.

La validación en el backend es fundamental. El frontend puede tener validación, pero nunca confíen solo en la validación del frontend. Siempre validen también en el backend.`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar.

Hoy completamos el CRUD completo: Create, Read, Update, Delete.

GET no modifica datos. POST, PUT y DELETE sí.

Siempre validen las entradas con status 400 si algo está mal.

Los códigos de estado HTTP correctos son: 200 para éxito, 201 para creación, 204 para eliminación sin contenido, 400 para error del cliente, 404 para no encontrado.

Los arrays en memoria son útiles para aprender, pero no son persistentes. En la siguiente clase vamos a conectar con Supabase, una base de datos real donde los datos no se pierden al reiniciar el servidor.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-7-7': [
    {
      "time": "0:00-0:10",
      "details": `Vamos a hacer una demostración rápida.

Tengo el servidor Express funcionando. Voy a crear algunos posts. Hagan GET /posts y vean que están ahí.

Ahora voy a detener el servidor. Ctrl+C.

Y lo vuelvo a iniciar. node index.js.

Hagan GET /posts otra vez.

¿Qué pasó? Los posts desaparecieron.

Ese es el problema de los arrays en memoria. Cuando el servidor se detiene, todo lo que estaba en memoria se pierde. Es como si apagaran su computadora y al encenderla todos los archivos no guardados desaparecieran.

Hoy vamos a resolver este problema. Vamos a usar una base de datos real llamada Supabase.

Los datos van a vivir en la nube, no en la memoria del servidor. Pueden reiniciar el servidor mil veces y los datos van a seguir ahí.`
    },
    {
      "time": "0:10-0:20",
      "details": `Dos opciones: Supabase y Firebase.

Supabase usa PostgreSQL, que es SQL. Firebase usa Firestore, que es NoSQL.

¿Cuál es la diferencia? SQL tiene tablas, filas y columnas. Es como Excel pero mucho más poderoso. NoSQL tiene documentos y colecciones, es más flexible pero menos estructurado.

Para este curso vamos a usar Supabase por tres razones.

Primero, SQL es el estándar en la industria. Si aprenden SQL, pueden trabajar con cualquier base de datos relacional.

Segundo, Supabase nos permite usar REST API con fetch. No necesitan instalar SDKs ni librerías adicionales. Usan el mismo fetch que ya conocen.

Tercero, el free tier de Supabase es muy generoso.

Ventaja adicional: con Supabase no necesitamos un backend Express separado. Podemos conectarnos directamente desde el frontend. El backend se vuelve opcional.`
    },
    {
      "time": "0:20-0:30",
      "details": `Vamos a crear un proyecto en Supabase.

Primero, abran https://supabase.com en sus navegadores.

Hagan clic en "Start your project" e inicien sesión con GitHub. Es seguro, solo pide permisos básicos.

Una vez dentro, hagan clic en "New project".

El nombre del proyecto va a ser "blog-devf".

La contraseña de la base de datos: generen una contraseña segura. Supabase les puede generar una. Guárdenla en un lugar seguro.

La región: elijan la más cercana a ustedes.

Van a tardar unos minutos en crear la base de datos. Mientras espera, les voy a mostrar el dashboard.

Acá tienen el Table Editor para ver las tablas, el SQL Editor para ejecutar consultas, y la sección de API donde están las keys que vamos a usar.

Una vez que el proyecto esté listo, vamos al SQL Editor y ejecutamos esto:

\`\`\`sql
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'Anónimo',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

Vamos a explicar cada tipo de dato.

BIGSERIAL es un número entero que se incrementa automáticamente. Es como nuestro nextId pero lo maneja la base de datos.

TEXT es para texto largo.

NOT NULL significa que el campo es obligatorio.

DEFAULT asigna un valor por defecto si no se envía nada.

TIMESTAMPTZ guarda la fecha y hora con zona horaria.

Ejecuten el SQL y luego vayan al Table Editor para ver la tabla creada.`
    },
    {
      "time": "0:30-0:40",
      "details": `Ahora vamos a conectar desde nuestro frontend.

En el dashboard de Supabase, vayan a Project Settings → API. Ahí van a encontrar dos cosas: la URL del proyecto y la anon key.

La URL es algo como https://tuproyecto.supabase.co
La anon key es un string largo como eyJhbGciOiJ...

Copia estos valores.

Ahora, en su proyecto de React, van a escribir este código:

\`\`\`js
const SUPABASE_URL = 'https://[project].supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJ...';

async function loadPosts() {
  const response = await fetch(
    \`\${SUPABASE_URL}/rest/v1/posts\`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: \`Bearer \${SUPABASE_KEY}\`,
      },
    }
  );
  const posts = await response.json();
  console.log(posts);
}
\`\`\`

Fíjense que es el mismo fetch que ya conocen. La diferencia son tres cosas.

La URL apunta a supabase.co en lugar de localhost.

Necesitamos dos headers: apikey y Authorization. Ambos usan la misma key.

La anon key es segura porque Supabase tiene Row Level Security. Eso significa que aunque la key sea pública, solo pueden acceder a los datos que tenga permiso. Por ahora vamos a desactivar RLS para facilitar, pero en producción siempre deben tenerlo activado.

Vamos a probarlo en la consola del navegador. Vean cómo aparecen los posts de Supabase.`
    },
    {
      "time": "0:40-0:50",
      "details": `Ahora veamos cómo hacer el CRUD completo contra Supabase.

Para crear un post:

\`\`\`js
async function createPost(title, content) {
  const response = await fetch(\`\${SUPABASE_URL}/rest/v1/posts\`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: \`Bearer \${SUPABASE_KEY}\`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ title, content }),
  });
  const newPost = await response.json();
  console.log('Creado:', newPost);
}
\`\`\`

El header Prefer: return=representation le dice a Supabase que nos devuelva el registro creado. Sin este header, solo devuelve un código de éxito.

Para eliminar:

\`\`\`js
async function deletePost(id) {
  await fetch(\`\${SUPABASE_URL}/rest/v1/posts?id=eq.\${id}\`, {
    method: 'DELETE',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: \`Bearer \${SUPABASE_KEY}\`,
    },
  });
}
\`\`\`

Fíjense en la URL: id=eq.[ID]. eq significa "equals". Es la sintaxis de Supabase para filtrar. En SQL sería WHERE id = [ID].

Y ahora algo que no podíamos hacer con Express: tiempo real.

\`\`\`js
const channel = supabase
  .channel('posts-changes')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Nuevo post en tiempo real:', payload.new);
      setPosts(prev => [...prev, payload.new]);
    }
  )
  .subscribe();
\`\`\`

Si abren dos pestañas del frontend y crean un post en una, va a aparecer automáticamente en la otra. Eso es Realtime. Supabase usa WebSockets para esto. Es perfecto para apps colaborativas o feeds en vivo.`
    },
    {
      "time": "0:50-1:25",
      "details": `Ejercicio: Van a migrar su blog a Supabase.

Pasos:

Primero, creen la tabla posts en Supabase con los campos que vimos.

Segundo, configuren las variables de entorno en su proyecto. Creen un archivo .env en la raíz:

\`\`\`bash
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJ...
\`\`\`

El prefijo VITE_ es importante. Vite solo expone las variables de entorno que empiezan con VITE_. Si no lo ponen, la variable no va a estar disponible en el frontend.

Para acceder a ellas en su código:

\`\`\`js
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
\`\`\`

Tercero, reemplacen el backend local (los endpoints de Express que apuntaban a localhost) por las llamadas a Supabase.

Cuarto, implementen GET, POST y DELETE contra Supabase.

Quinto, opcional: agreguen autenticación por email con supabase.auth.signUp().

Tienen 30 minutos. Yo voy a ir pasando para ayudar.

\textit{Recorrer el aula.}`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar.

Hoy vimos que Supabase nos da PostgreSQL como base de datos en la nube, con REST API y Realtime.

Reemplaza nuestro backend local de Express. De hecho, si usan Supabase desde el frontend, ya no necesitan un backend Express.

El fetch que ya conocían funciona exactamente igual, solo cambian la URL y los headers.

Y la guinda del pastel: Realtime sincroniza los datos entre usuarios en tiempo real.

En la próxima clase vamos a hacer deploy a producción. Su blog va a estar disponible para que cualquiera en internet lo vea.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-7-8': [
    {
      "time": "0:00-0:10",
      "details": `Hoy es el último día del módulo. Vamos a subir su blog a producción.

¿Cuál es la diferencia entre desarrollo y producción?

Desarrollo es cuando están trabajando en localhost. Solo ustedes pueden ver su aplicación.

Producción es cuando suben la aplicación a internet y cualquiera puede acceder a ella con una URL.

Para producción vamos a usar:

Frontend → Vercel. Vercel es una plataforma que deploya aplicaciones frontend con solo conectar el repositorio de GitHub.

Backend → si usaron Supabase directo desde el frontend, no necesitan backend. Si tienen un servidor Express aparte, pueden usar Render que es gratuito con límites.

Base de datos → Supabase, que ya está en la nube, no necesitan hacer nada.

Primer paso: preparemos el proyecto para producción.

\`\`\`bash
npm run build
\`\`\`

Esto va a generar una carpeta dist con los archivos optimizados y minificados.

\`\`\`bash
npx serve -s dist
\`\`\`

Esto levanta un servidor local para probar el build. Verifiquen que todo funciona.

También asegúrense de que las variables de entorno estén configuradas en el archivo .env.`
    },
    {
      "time": "0:10-0:25",
      "details": `Vamos a hacer deploy en Vercel.

Hay dos opciones.

Opción 1: desde GitHub, que es la recomendada.

Primero, suban su proyecto a GitHub.

\`\`\`bash
git init
git add .
git commit -m "Mi blog full-stack"
git remote add origin https://github.com/tu-usuario/blog.git
git push -u origin main
\`\`\`

Si no tienen cuenta en GitHub, créenla, es gratuita.

Luego, vayan a https://vercel.com e inicien sesión con GitHub. Van a ver que Vercel puede ver sus repositorios.

Hagan clic en "Add New Project", seleccionen su repositorio, y Vercel va a detectar automáticamente que es un proyecto de Vite o React.

Antes de hacer clic en Deploy, abran la sección de Environment Variables y agreguen:

VITE_SUPABASE_URL con la URL de su proyecto
VITE_SUPABASE_ANON_KEY con su anon key

Y luego hagan clic en Deploy. En aproximadamente un minuto, su aplicación va a estar en producción.

Opción 2: desde la terminal con Vercel CLI.

\`\`\`bash
npm i -g vercel
vercel --prod
\`\`\`

La ventaja de GitHub es que cada vez que hagan git push a main, Vercel hace deploy automático. No tienen que hacer nada manualmente.`
    },
    {
      "time": "0:25-0:35",
      "details": `Si ustedes tienen un backend Express separado, también pueden desplegarlo en Render.

Render es una plataforma similar a Vercel pero para backends.

Van a https://render.com, crean una cuenta, y hacen clic en "New Web Service".

Conectan su repositorio de backend, eligen Node como runtime, y en Build Command ponen npm install, en Start Command ponen npm start.

Algo importante: su backend Express debe escuchar en process.env.PORT porque Render asigna un puerto dinámico.

\`\`\`js
const PORT = process.env.PORT || 3000;
\`\`\`

Si usaron Supabase directo desde el frontend, no necesitan hacer esto. Su frontend ya habla directamente con Supabase, no hay backend intermedio.`
    },
    {
      "time": "0:35-0:50",
      "details": `Una vez que tienen la URL de Vercel, van a probar que todo funciona en producción.

Abran la URL, van a ver su blog funcionando en internet.

Prueben el CRUD completo: crear un post, ver la lista, editarlo, eliminarlo.

Si implementaron autenticación, pruébenla también.

Si tienen un celular a mano, abran la URL desde el teléfono para verificar que el diseño responsive funciona.

Compartan su link en el chat del grupo o en Discord para que todos vean el trabajo de los demás.

Si la aplicación no carga, revisen que las variables de entorno estén configuradas en Vercel. Es el error más común.

Si los datos no se guardan, revisen la conexión con Supabase. A veces las tablas no se crearon correctamente.`
    },
    {
      "time": "0:50-1:05",
      "details": `Ahora, cada uno va a presentar su blog en 2 minutos.

Quiero que me digan cuatro cosas:

Primero, la URL de su blog para que todos la vean.

Segundo, qué funcionalidades implementaron. ¿Tienen CRUD completo? ¿Autenticación? ¿Diseño responsive?

Tercero, un detalle que les guste de su blog. Puede ser el diseño, una funcionalidad, o algo que hayan aprendido haciéndolo.

Cuarto, un reto que hayan superado durante el módulo.

No importa si no está perfecto. Lo importante es que lo terminaron y está en producción.

Vamos a celebrar el trabajo de cada uno.

\textit{Crear ambiente de celebración.}`
    },
    {
      "time": "1:05-1:20",
      "details": `Vamos a hacer una retrospectiva del módulo.

Repasemos lo que aprendimos en estas 8 clases:

Clase 1: Formularios controlados y React Hook Form. Aprendieron a manejar formularios con validación.

Clase 2: Consumo de APIs con useEffect. Aprendieron a traer datos de internet.

Clase 3: Estado global con Context API. Aprendieron a compartir datos entre componentes sin prop drilling.

Clase 4: Backend y API REST. Aprendieron cómo se comunican frontend y backend.

Clase 5: Servidor con Node.js y Express. Escribieron su primer servidor web.

Clase 6: CRUD completo. Aprendieron a crear, leer, actualizar y eliminar datos.

Clase 7: Base de datos con Supabase. Sus datos ahora viven en la nube.

Clase 8: Deploy a producción. Su blog está en internet para que todo el mundo lo vea.

Preguntas de reflexión:

¿Qué fue lo más difícil del módulo para ustedes?
¿Qué fue lo más divertido?
¿Qué se llevan de este módulo para sus proyectos futuros?
¿En qué área les gustaría profundizar?

Este es su primer proyecto full-stack profesional. Pueden usarlo como portafolio. Esto es exactamente lo que se hace en la industria.`
    },
    {
      "time": "1:20-1:30",
      "details": `Vamos a cerrar el módulo.

Quiero que se tomen un momento para pensar en dónde estaban hace 8 clases. Muchos de ustedes nunca habían escrito una línea de backend. Hoy tienen un blog completo funcionando en producción.

Eso es enorme.

Construyeron un blog full-stack desde cero. Desde un formulario en React hasta una aplicación en producción con base de datos en la nube.

Esto es exactamente lo que se hace en la industria. No es una simulación, no es un ejercicio académico. Es el stack real que usan las empresas.

Lo que sigue es el Módulo 8 con temas avanzados. Pero antes, dense el crédito por lo que lograron.

Este es su portafolio. Sigan practicando, sigan mejorando su blog. Agréguenle más funcionalidades. Muéstrenlo en entrevistas.

Felicitaciones por completar React Avanzado.

¿Alguna pregunta final? ¿Algo que quieran compartir antes de cerrar?

Nos vemos en el siguiente módulo.`
    }
  ],
  'lesson-8-1': [
    {
      "time": "0:00-0:10",
      "details": `Vamos a empezar el módulo 8. Este módulo es diferente a todos los anteriores.

En los módulos anteriores aprendieron a programar. Aprendieron React, Express, bases de datos, deploy.

Este módulo no es sobre programar. Es sobre cómo unirse a la comunidad de desarrollo de software.

El open source, o código abierto, es software cuyo código fuente está disponible para que cualquiera lo vea, lo use, lo modifique y lo comparta.

Ejemplos: Linux, React, VS Code, Python, WordPress. Todo eso es open source.

Y hoy ustedes van a empezar su camino como contribuidores open source.

Pregunta: ¿Qué ejemplos de software open source conocen? ¿Alguien ha usado algo que sepa que es open source?

La idea de este módulo es que aprendan el flujo completo de contribución. Y al final del módulo, van a haber hecho una contribución real a un proyecto open source.

El proyecto al que van a contribuir es esta misma plataforma, Sensei, la que están usando ahora para ver la clase. Van a poder agregar mejoras reales. Y yo voy a revisar y aprobar sus contribuciones.

¿Listos? Vamos.`
    },
    {
      "time": "0:10-0:20",
      "details": `¿Por qué contribuir a open source?

Primero, su código va a estar en producción. No es un ejercicio de clase, no es un proyecto personal que nadie ve. Es código real que otros developers van a usar.

Segundo, es un portafolio real para entrevistas. Cuando un reclutador vea que tienen contribuciones open source, eso pesa muchísimo más que cualquier proyecto académico.

Tercero, aprenden de developers experimentados. Cuando alguien revisa su código, les va a decir cosas como "esto se puede hacer mejor así" o "existe una función para esto". Eso es aprendizaje gratuito.

Cuarto, construyen su reputación en GitHub. Cada contribución queda en su perfil para siempre.

Y quinto, es su forma de dar algo de vuelta a la comunidad. Todos usamos software open source todos los días. Esta es su oportunidad de contribuir de vuelta.

Pregunta: ¿Cuántos de ustedes tienen proyectos en GitHub? Muéstrenme sus perfiles.

Bien. Este módulo los va a ayudar a llenar ese perfil de contribuciones reales.`
    },
    {
      "time": "0:20-0:30",
      "details": `Vamos a ver el flujo de contribución completo.

Son 10 pasos:

Primero, encontrar un proyecto al que contribuir. En nuestro caso, ya tenemos el proyecto: la plataforma Sensei.

Segundo, hacer fork. Fork es crear una copia del repositorio en tu cuenta de GitHub.

Tercero, clonar localmente. Descargar esa copia a tu computadora.

Cuarto, crear una rama. Nunca trabajes directamente en main, siempre en una rama separada.

Quinto, hacer cambios. Ahí es donde programas la mejora o corrección.

Sexto, commit y push. Guardas tus cambios y los subes a GitHub.

Séptimo, abrir un Pull Request. Le pides al dueño del proyecto que revise e incorpore tus cambios.

Octavo, code review. Alguien revisa tu código y te da feedback.

Noveno, aprobación. El maintainer dice "está bien, lo acepto".

Décimo, merge. Tus cambios se incorporan al proyecto principal.

Y ese es el flujo. En las próximas clases vamos a hacer cada uno de estos pasos.`
    },
    {
      "time": "0:30-0:45",
      "details": `Vamos a abrir el repositorio del proyecto.

Vayan a esta URL: https://github.com/devf-sensei/sensei-platform

Esta es la plataforma que están usando ahora mismo para ver la clase.

Vamos a recorrer las secciones juntos.

Primero, la pestaña Code. Aquí está todo el código fuente. Pueden ver las carpetas, los archivos, los commits.

Segundo, Issues. Aquí se reportan bugs y se sugieren mejoras. Cuando encuentren algo que mejorar, aquí es donde lo reportan.

Tercero, Pull Requests. Aquí están las contribuciones de otras personas. Pueden ver PRs abiertos y cerrados para entender qué tipo de cambios se hacen.

Cuarto, Projects. Un tablero para organizar el trabajo.

Quinto, Wiki. Documentación del proyecto.

Sexto, Security. Políticas de seguridad.

Séptimo, Insights. Estadísticas del proyecto: cuántos commits, quiénes contribuyen, etc.

Y algo muy importante: la licencia. El archivo LICENSE. Esto define cómo se puede usar el código.

Vamos a verlo en vivo. Voy a compartir pantalla y recorremos cada sección.`
    },
    {
      "time": "0:45-0:55",
      "details": `Ejercicio. Van a explorar el repositorio por su cuenta.

Quiero que hagan lo siguiente:

Primero, lean el README. El README es la puerta de entrada del proyecto. Ahí debería venir información de qué hace el proyecto, cómo instalarlo, cómo contribuir.

Segundo, busquen el archivo de licencia. ¿Qué tipo de licencia tiene?

Tercero, miren los issues abiertos. ¿De qué tipo hay? ¿Hay alguno etiquetado como good first issue?

Cuarto, miren los Pull Requests cerrados. Así pueden ver qué tipo de contribuciones ha recibido el proyecto.

Quinto, identifiquen la estructura de carpetas. ¿Cómo está organizado el proyecto?

Tienen 15 minutos. Después compartimos lo que encontraron.`
    },
    {
      "time": "0:55-1:05",
      "details": `Hablemos de los issues. Los issues son tareas.

Cuando alguien encuentra un bug, crea un issue. Cuando alguien quiere una mejora, crea un issue.

Los issues tienen labels para organizarlos. Las más importantes para ustedes son:

Good first issue, con color verde. Son issues diseñados para quienes empiezan. Son tareas pequeñas y bien explicadas.

Help wanted, con color amarillo. El proyecto necesita ayuda con esto.

Bug, con color rojo. Algo está mal.

Enhancement, con color azul. Una mejora o feature nueva.

Documentation. Cosas de documentación.

Cuando vean un issue que les interese, pueden comentar "me gustaría trabajar en esto" y alguien se los asigna.

¿Ven? No es complicado. Es solo comunicación.`
    },
    {
      "time": "1:05-1:20",
      "details": `Hablemos de cómo comunicarse en proyectos open source.

Hay reglas no escritas que es importante conocer.

Primero, sean respetuosos. Detrás de cada usuario de GitHub hay una persona. Trátenla como les gustaría ser tratados.

Segundo, critiquen el código, no a la persona. No digan "esto está mal", digan "esta función podría mejorar si hacemos X".

Tercero, ayuden a otros contribuidores. Si ven que alguien preguntó algo y saben la respuesta, respondan.

Cuarto, sigan las guías de contribución. Algunos proyectos tienen un archivo CONTRIBUTING.md que explica cómo contribuir.

Y quinto, paciencia. Los mantenedores son voluntarios. Pueden tardar en responder.

El código de conducta no es opcional. Es obligatorio para participar. Si alguien no lo respeta, puede ser expulsado del proyecto.`
    },
    {
      "time": "1:20-1:25",
      "details": `Compartamos lo que encontraron en la exploración.

¿Qué descubrieron del proyecto? ¿Algo les llamó la atención? ¿Encontraron algún issue interesante?

Compartan pantalla si quieren mostrar algo.`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar la clase de hoy.

Vimos qué es open source, por qué contribuir, el flujo de contribución, y exploramos el repositorio del proyecto.

En la siguiente clase vamos a hacer nuestro primer fork. Van a tener su propia copia del proyecto.

Para la casa: si tienen GitHub, denle una estrella al repositorio. Si no tienen cuenta de GitHub, créanla. La vamos a necesitar.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-8-2': [
    {
      "time": "0:00-0:10",
      "details": `Hoy vamos a hacer nuestro primer fork.

¿Qué es un fork? Un fork es una copia de un repositorio en tu cuenta de GitHub.

Imaginen que tienen un libro. Y quieren hacer anotaciones en ese libro. Pero no quieren rayar el original. Lo que hacen es sacar una fotocopia del libro y rayar la fotocopia.

El repositorio original es el libro. El fork es la fotocopia. Ustedes pueden hacer lo que quieran en su fotocopia sin afectar el original.

El repositorio original se llama upstream. La fotocopia en su cuenta se llama origin.

Y cuando tengan sus cambios listos, le dicen al dueño del original: "oye, hice estos cambios en mi copia, ¿quieres incorporarlos al original?". Eso se llama Pull Request.

Pero primero, el fork.`
    },
    {
      "time": "0:10-0:25",
      "details": `Vamos a hacer el fork en vivo. Todos sigan en sus pantallas.

Abran el repositorio: https://github.com/devf-sensei/sensei-platform

Arriba a la derecha, hay un botón que dice Fork. Hagan clic ahí.

Les va a preguntar a dónde quieren hacer el fork. Seleccionen su cuenta de GitHub.

Le pueden cambiar el nombre si quieren, pero yo recomiendo dejarlo igual.

Y hagan clic en Create Fork.

Esperen unos segundos mientras GitHub hace la copia.

Listo. Ahora tienen el repositorio en su cuenta. La URL debe ser algo como:

https://github.com/TU_USUARIO/sensei-platform

Fíjense que arriba a la izquierda dice "forked from devf-sensei/sensei-platform". Eso indica que es un fork.

Ya tienen su copia. Ahora vamos a descargarla a su máquina.`
    },
    {
      "time": "0:25-0:35",
      "details": `Para trabajar localmente, necesitamos clonar el repositorio.

Abran la terminal. Y escriban:

\`\`\`bash
git clone https://github.com/TU_USUARIO/sensei-platform.git
\`\`\`

Cambien TU_USUARIO por su nombre de usuario de GitHub.

Esto va a crear una carpeta llamada sensei-platform con todo el código.

\`\`\`bash
cd sensei-platform
\`\`\`

Ya están dentro del proyecto. Pueden abrirlo en su editor.

Ahora, una pregunta importante. Cuando clonaron, el repositorio remoto que se configuró automáticamente se llama origin y apunta a su fork. Pero necesitamos otro remoto que apunte al repositorio original para poder traer los cambios nuevos.

Eso se llama upstream.`
    },
    {
      "time": "0:35-0:50",
      "details": `Vamos a configurar el remoto upstream.

\`\`\`bash
git remote add upstream https://github.com/devf-sensei/sensei-platform.git
\`\`\`

Ahora verifiquen que los dos remotos estén configurados:

\`\`\`bash
git remote -v
\`\`\`

Deben ver algo así:

origin    https://github.com/TU_USUARIO/sensei-platform.git (fetch)
origin    https://github.com/TU_USUARIO/sensei-platform.git (push)
upstream  https://github.com/devf-sensei/sensei-platform.git (fetch)
upstream  https://github.com/devf-sensei/sensei-platform.git (push)

¿Ven la diferencia? Origin es su fork, donde ustedes tienen permisos de escritura. Upstream es el repositorio original, donde solo pueden leer.

Entonces, ¿para qué sirve cada uno?

Origin: para subir sus cambios con git push.

Upstream: para traer los cambios del original con git pull.

Nunca hagan push a upstream. No tiene sentido, no tienen permisos.`
    },
    {
      "time": "0:50-1:05",
      "details": `Ahora, algo muy importante. El repositorio original va a recibir cambios de otras personas. Puede que mientras ustedes trabajan, yo u otros contribuidores agreguemos código nuevo.

Para que su fork esté actualizado, tienen que sincronizarlo.

Siempre que vayan a empezar a trabajar, hagan esto:

\`\`\`bash
git checkout main
git pull upstream main
git push origin main
\`\`\`

Primero se cambian a la rama main. Segundo, traen los cambios del repositorio original. Tercero, suben esos cambios a su fork.

Esto asegura que su fork está al día.

Si no hacen esto, pueden tener conflictos después. Imagínense que ustedes están trabajando en un archivo, y al mismo tiempo yo cambio ese mismo archivo. Cuando quieran hacer el PR, va a haber un conflicto y va a ser más complicado de resolver.

Por eso: siempre sincronicen antes de empezar.
Háganlo un hábito. Como lavarse los dientes.`
    },
    {
      "time": "1:05-1:25",
      "details": `Ejercicio. Van a hacer el fork y configuración completa.

Pasos:

Primero, hagan fork del repositorio. Si ya lo hicieron conmigo, perfecto.

Segundo, clónenlo a su máquina.

Tercero, agreguen el remoto upstream.

Cuarto, verifiquen con git remote -v.

Quinto, traigan los últimos cambios con git pull upstream main.

Tienen 20 minutos. Cuando terminen, levanten la mano y voy a verificar que tengan los dos remotos configurados.

\textit{Recorrer el aula.}`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar.

Hoy hicieron fork del repositorio, lo clonaron, configuraron origin y upstream, y aprendieron a sincronizar.

Ahora tienen su copia local lista para trabajar.

En la siguiente clase vamos a hacer nuestro primer Pull Request. Vamos a crear una rama, hacer un cambio, y abrir un PR.

Asegúrense de tener git configurado con su nombre y email:

\`\`\`bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
\`\`\`

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-8-3': [
    {
      "time": "0:00-0:10",
      "details": `Hoy es el día. Vamos a abrir nuestro primer Pull Request.

Pero antes, hablemos de las ramas.

En git, main es la rama principal. Es el código que está en producción. Es sagrada. Nunca, nunca, nunca trabajen directamente en main.

Cada cambio que hagan va en su propia rama. Una rama es como un borrador. Trabajan ahí, y cuando está listo, lo incorporan a main.

Los nombres de rama deben ser descriptivos:

fix/typo-readme → si van a corregir un typo
feature/validacion-email → si van a agregar una validación
docs/contributing-guide → si van a mejorar documentación

El patrón es: tipo/descripcion-corta.

¿Por qué? Porque cuando alguien vea la rama, debe entender de qué se trata sin tener que abrirla.
Y porque después, esa rama se convierte en el Pull Request.`
    },
    {
      "time": "0:10-0:25",
      "details": `Vamos a hacerlo paso a paso en vivo.

Primero, sincronicen su fork:

\`\`\`bash
git checkout main
git pull upstream main
git push origin main
\`\`\`

Ya están en main y está actualizada. Ahora creen una rama:

\`\`\`bash
git checkout -b fix/typo-readme
\`\`\`

El comando git checkout -b hace dos cosas: crea la rama y se mueve a ella.

Ahora abran el README.md en su editor. Busquen un typo o algo que mejorar. Si no encuentran, pueden agregar una línea al final, algo como "Contribuciones bienvenidas".

Hagan el cambio. Guarden el archivo.

Ahora vean qué cambió:

\`\`\`bash
git status
\`\`\`

git status les muestra los archivos modificados.`
    },
    {
      "time": "0:25-0:35",
      "details": `Ahora vamos a hacer commit.

Primero, agregamos el archivo al staging:

\`\`\`bash
git add README.md
\`\`\`

Si quieren agregar todos los archivos modificados, pueden usar git add .

Luego, el commit:

\`\`\`bash
git commit -m "Corregir typo en la sección de instalación del README"
\`\`\`

Fíjense en el mensaje. Es descriptivo. Dice exactamente qué cambió.

Mensajes malos: "fix", "cambios", "actualización", "cosas".

Mensajes buenos: "Corregir typo en README", "Agregar validación de email en formulario de registro".

Los mensajes de commit son comunicación con otros developers. Cuando alguien vea el historial de commits, debe entender qué cambió sin tener que ver el código.

Ahora suban la rama a GitHub:

\`\`\`bash
git push origin fix/typo-readme
\`\`\`

Fíjense: push a origin, no a upstream. Es su fork.`
    },
    {
      "time": "0:35-0:50",
      "details": `Ahora viene la magia.

Vayan a su repositorio en GitHub: https://github.com/TU_USUARIO/sensei-platform

Arriba va a aparecer un banner amarillo que dice algo como:

"fix/typo-readme had recent pushes" y un botón que dice "Compare & Pull Request".

Hagan clic ahí.

Se abre la página para crear el Pull Request. Vean los campos:

Base repository: devf-sensei/sensei-platform
Base: main
Head repository: TU_USUARIO/sensei-platform
Compare: fix/typo-readme

Base es el repositorio original, rama main.
Head es su fork, rama fix/typo-readme.

Título: escriban un título descriptivo. Por ejemplo: "Corregir typo en README"

Descripción: expliquen qué cambió y por qué.

\`\`\`
## Descripción
Corregí un typo en la sección de instalación del README.

## Cambios realizados
- Cambié "intalación" por "instalación"

## Issue relacionado
Closes #12
\`\`\`

Si el cambio está relacionado con un issue, pueden escribir "Closes #numero" y cuando se mergee el PR, el issue se cierra automáticamente.

Finalmente, hagan clic en "Create Pull Request".

¡Felicidades! Acaban de abrir su primer Pull Request.`
    },
    {
      "time": "0:50-0:55",
      "details": `Ahora que el PR está abierto, ¿qué sigue?

Yo voy a recibir una notificación de que hay un PR nuevo. Voy a entrar a revisarlo.

Voy a ver los cambios que hicieron. Voy a dejar comentarios si algo se puede mejorar. Y si todo está bien, voy a aprobarlo.

Puede que pida cambios. Eso es normal. No significa que lo hicieron mal. Significa que podemos mejorarlo.

Cuando el PR esté aprobado, voy a mergearlo. Sus cambios van a pasar a formar parte del repositorio principal.

Y ahí, oficialmente, van a ser contribuidores open source.

¿Ven? No es complicado. Son unos pocos comandos y un clic en GitHub.`
    },
    {
      "time": "0:55-1:20",
      "details": `Ejercicio. Van a abrir su primer Pull Request.

Pasos:

Primero, sincronicen su fork con upstream.

Segundo, creen una rama con un nombre descriptivo.

Tercero, hagan un cambio pequeño. Un typo en el README, una línea de documentación, algo simple.

Cuarto, hagan git add y git commit con un mensaje descriptivo.

Quinto, hagan git push a su rama.

Sexto, abran el Pull Request en GitHub con una descripción clara.

Tienen 25 minutos. Levanten la mano si se atoran.

\textit{Recorrer el aula y ayudar.}`
    },
    {
      "time": "1:20-1:25",
      "details": `Vamos a revisar los PRs que abrieron.

Voy a entrar al repositorio y mirar los PRs. Voy a dejar comentarios.

Miren sus notificaciones de GitHub. Si ven que alguien les dejó un comentario, respóndanlo.

Voy a revisar algunos PRs en vivo para que vean cómo se ve el code review.

Lo importante: no se tomen los comentarios como algo personal. El code review es sobre el código, no sobre ustedes. Todos empezamos así.`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar.

Hoy hicieron algo importante: abrieron su primer Pull Request.

Puede que todavía no esté mergeado. Depende de si yo lo apruebo o pido cambios. Pero el PR está ahí. Ya está.

En la siguiente clase vamos a ver exactamente eso: cómo funciona el code review, cómo responder a los comentarios, y cómo se mergea un PR.

No se preocupen si pidieron cambios. Es parte del proceso.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-8-4': [
    {
      "time": "0:00-0:10",
      "details": `Hoy vamos a hablar de code review.

El code review es cuando otro developer revisa tu código. Es una práctica estándar en la industria. En casi todas las empresas de tecnología, ningún código llega a producción sin ser revisado por al menos otra persona.

¿Para qué sirve?

Primero, para encontrar errores antes de que lleguen a producción. Una segunda persona ve cosas que tú no viste.

Segundo, para compartir conocimiento. Cuando alguien revisa tu código, aprende cómo piensas. Cuando tú revisas el código de alguien, aprendes nuevas formas de hacer las cosas.

Tercero, para mantener consistencia. El equipo acuerda ciertas prácticas y el code review asegura que se sigan.

Y algo importante: el code review no es personal. Cuando alguien te dice "esta función se puede mejorar", no está diciendo "eres mal programador". Está diciendo "este código se puede mejorar".

Separen siempre su identidad de su código. El código no es ustedes.`
    },
    {
      "time": "0:10-0:25",
      "details": `Vamos a revisar algunos PRs en vivo.

Abro el repositorio, voy a Pull Requests, y vamos a ver los que abrieron.

Miren, aquí tengo varios PRs. Vamos a abrir uno.

Veo que este PR cambia el README. Voy a revisar la pestaña "Files changed".

Aquí puedo ver exactamente qué líneas cambiaron. Las líneas en verde son las que se agregaron. Las líneas en rojo son las que se eliminaron.

Puedo dejar un comentario en una línea específica. Por ejemplo, si veo un error, hago clic en el signo + al lado de la línea y escribo mi comentario.

También puedo aprobar el PR o solicitar cambios.

Si solo dejo un comentario sin aprobar ni solicitar cambios, es un comentario informal, no bloquea el PR.

Si solicito cambios, el PR queda en pausa hasta que se hagan los cambios.

Si apruebo, el PR está listo para mergear.

Vamos a hacer los tres tipos de review para que vean cómo funciona.`
    },
    {
      "time": "0:25-0:40",
      "details": `Ahora, ¿cómo responden cuando alguien les deja comentarios en su PR?

Vamos a verlo.

Primero, reciban una notificación de GitHub. Puede ser por email o en la misma página del PR.

Segundo, lean el comentario con mente abierta. No se pongan a la defensiva.

Tercero, si están de acuerdo, hagan el cambio.

\`\`\`bash
git checkout fix/typo-readme
# hacer los cambios
git add .
git commit -m "Corregir según code review"
git push origin fix/typo-readme
\`\`\`

El PR se actualiza automáticamente. No necesitan abrir un nuevo PR.

Cuarto, respondan al comentario en GitHub. Escriban algo como:

"Gracias por la sugerencia. Ya lo corregí en el último commit."

Eso le avisa al revisor que ya está listo para una nueva revisión.

Si no están de acuerdo con un comentario, pueden explicar su punto de vista. Pero siempre con respeto.

"A mí me parece que esta otra forma funciona mejor porque..."

El code review es una conversación, no una orden.`
    },
    {
      "time": "0:40-0:50",
      "details": `Cuando el PR está aprobado, alguien tiene que mergearlo.

En la mayoría de los proyectos, el maintainer es quien mergea. En algunos proyectos, tú puedes mergear tu propio PR después de la aprobación.

En este proyecto, yo voy a mergear los PRs.

Hay tres formas de mergear en GitHub:

Primero, Create a merge commit. Mantiene todo el historial de commits de tu rama. Es la opción más común.

Segundo, Squash and merge. Combina todos los commits de tu rama en un solo commit. El historial queda más limpio.

Tercero, Rebase and merge. Pone tus commits al frente del historial, como si los hubieras hecho justo ahora.

Para este proyecto vamos a usar Squash and merge.

Cuando el PR está mergeado, el cambio ya está en el repositorio principal. Tu código está en producción.

Después del merge, debes sincronizar tu fork:

\`\`\`bash
git checkout main
git pull upstream main
git push origin main
\`\`\`

Y puedes borrar la rama del PR para mantener tu fork limpio:

\`\`\`bash
git branch -d fix/typo-readme
git push origin --delete fix/typo-readme
\`\`\``
    },
    {
      "time": "0:50-1:10",
      "details": `Ejercicio: Van a responder al code review.

Si yo les dejé comentarios en su PR, van a hacer los cambios solicitados.

Si su PR ya fue aprobado, van a ayudar a otro compañero con el suyo.

Pasos:

Primero, revisen si tienen notificaciones en GitHub.

Segundo, si hay comentarios, leanlos y hagan los cambios.

Tercero, hagan commit y push para actualizar el PR.

Cuarto, respondan a los comentarios.

Tienen 20 minutos. Yo voy a ir revisando los PRs actualizados.

\textit{Recorrer el aula.}`
    },
    {
      "time": "1:10-1:20",
      "details": `Vamos a aprobar algunos PRs en vivo.

Voy a entrar a los PRs que se actualizaron después del code review.

Este está bien. Código limpio, cambios correctos. Apruebo.

Y hago clic en "Merge pull request".

¡Listo! El PR está mergeado.

Este código ya está en el repositorio principal.

Felicidades a [nombre del estudiante] por su primer PR mergeado.

Vamos a seguir con los demás.

\textit{Aprobar PRs uno por uno, celebrando cada merge.}`
    },
    {
      "time": "1:20-1:25",
      "details": `Después del merge, no se olviden de sincronizar su fork.

\`\`\`bash
git checkout main
git pull upstream main
git push origin main
\`\`\`

Y borren la rama que usaron para el PR.

\`\`\`bash
git branch -d fix/typo-readme
git push origin --delete fix/typo-readme
\`\`\`

Mantener el fork limpio es importante. Si acumulan ramas viejas, después no saben cuáles están activas y cuáles no.`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar.

Hoy vimos el code review. Cómo se revisa el código, cómo responder a comentarios, cómo se aprueba y mergea un PR.

Ya varios de ustedes tienen su primer PR mergeado. Los que no, tranquilos, vamos a seguir trabajando.

En la siguiente clase vamos a ver cómo navegar issues, cómo elegir en qué trabajar, y cómo colaborar con otros contribuidores.

Para la casa: si su PR no está mergeado todavía, no se preocupen. Lo vamos a retomar en la siguiente clase.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-8-5': [
    {
      "time": "0:00-0:10",
      "details": `Hoy vamos a hablar de issues.

Los issues son el corazón de la comunicación en un proyecto open source. Es donde se reportan bugs, se sugieren mejoras, se hacen preguntas.

Cualquier persona puede crear un issue. No necesitas ser contribuidor del proyecto. Si usas un software y encuentras un bug, puedes crear un issue.

Los issues tienen labels. Las labels son etiquetas que ayudan a organizar y filtrar.

Las labels más importantes para ustedes:

Good first issue, en verde. Son issues diseñados para principiantes. Suelen ser tareas pequeñas, bien explicadas, con todo lo que necesitas saber para resolverlas.

Help wanted, en amarillo. El proyecto está pidiendo ayuda con esto.

Bug, en rojo. Algo está roto y hay que arreglarlo.

Enhancement, en azul. Una mejora o funcionalidad nueva.

Documentation. Cosas de documentación.

Cuando empiecen en un proyecto nuevo, filtren por good first issue. Es la mejor forma de empezar.`
    },
    {
      "time": "0:10-0:20",
      "details": `Vamos a ver cómo navegar y filtrar issues en el repositorio.

Abran https://github.com/devf-sensei/sensei-platform/issues

Aquí están todos los issues del proyecto. Por defecto, solo se ven los abiertos.

Pueden filtrar por label. Hagan clic en "Labels" y seleccionen "good first issue".

Ahora solo se ven los issues aptos para principiantes.

También pueden buscar issues por palabra clave. Por ejemplo, si quieren trabajar en algo de documentación, pueden buscar "docs".

O pueden ordenarlos por más recientes, más comentados, etc.

Vamos a abrir un issue etiquetado como good first issue para ver cómo es.

Tiene un título descriptivo. Tiene una descripción que explica el problema. A veces incluye pasos para reproducir si es un bug. Y a veces incluye sugerencias de cómo resolverlo.

Eso es un buen issue. Cuando vean uno así, ya tienen todo lo que necesitan para empezar a trabajar.`
    },
    {
      "time": "0:20-0:35",
      "details": `Antes de empezar a trabajar en un issue, hay que comunicarlo.

¿Por qué? Porque si dos personas empiezan a trabajar en el mismo issue al mismo tiempo, una de las dos va a perder el tiempo.

El proceso es:

Primero, encuentras un issue que te interese.

Segundo, escribes un comentario: "Hola, me gustaría trabajar en este issue. ¿Me lo pueden asignar?"

Tercero, el maintainer responde y te asigna el issue.

Cuarto, ya puedes empezar a trabajar.

A veces el maintainer te va a dar contexto adicional. "Claro, aquí hay algunos archivos que te pueden ayudar" o "ten en cuenta que esto depende de X".

Vean este issue. Voy a comentar: "Me gustaría trabajar en esto" y luego lo voy a asignar a alguien.

¿Ven? Sencillo.

Y cuando hagan el PR, pueden incluir "Closes #[número]" en la descripción. Cuando se mergee el PR, el issue se cierra automáticamente.

Es una forma de mantener todo organizado.`
    },
    {
      "time": "0:35-0:50",
      "details": `Ahora, ¿cómo se crea un issue?

Digamos que encuentran un bug en la plataforma. Por ejemplo, el botón de guardar no funciona en el celular.

Van a Issues, y hacen clic en "New Issue".

Puede que el proyecto tenga una plantilla. Si la tiene, la usan. Si no, escriben libremente.

Un buen reporte de bug tiene:

Título claro. "El botón de guardar no responde en móvil" es mejor que "no funciona".

Descripción. Expliquen qué está pasando.

Pasos para reproducir. Así el maintainer puede ver el error por sí mismo.

1. Abrir el blog en un celular
2. Ir a Nuevo Post
3. Llenar los campos
4. Hacer clic en Guardar
5. No pasa nada

Comportamiento esperado. ¿Qué debería pasar?

El post debería crearse y mostrar un mensaje de éxito.

Información adicional. Navegador, dispositivo, capturas de pantalla.

Un issue bien escrito se resuelve más rápido. El maintainer no tiene que estar preguntando "¿qué navegador usas?" o "¿puedes explicar mejor?"

También pueden crear issues para sugerir mejoras. "Se me ocurre que podríamos agregar X funcionalidad" o "la documentación de Y está incompleta".

Toda contribución empieza con un issue. Incluso si van a hacer el cambio ustedes mismos, crear el issue primero ayuda a discutir el enfoque antes de escribir código.`
    },
    {
      "time": "0:50-1:15",
      "details": `Ejercicio. Dos partes.

Primera parte: Van a comentar en un issue existente. Elijan un issue que les interese, escriban que les gustaría trabajarlo, y esperen a que los asigne.

Segunda parte: Van a crear un issue nuevo. Piensen en algo que les gustaría mejorar del proyecto. Puede ser un bug que encontraron, una mejora que se les ocurra, o documentación que falta.

Escriban el issue con:

Título claro
Descripción detallada
Si es bug: pasos para reproducir
Si es mejora: por qué sería útil

Tienen 25 minutos.

\textit{Recorrer el aula.}`
    },
    {
      "time": "1:15-1:20",
      "details": `Vamos a revisar los issues que crearon.

\textit{Leer los issues, etiquetarlos con labels, asignarlos a los estudiantes.}

Este está muy bien. Tiene título claro y descripción detallada. Le voy a poner label de enhancement.

Este también. Es un bug que podemos reproducir. Le pongo label de bug y good first issue.

Muy buen trabajo. Todos estos issues son válidos y los vamos a ir resolviendo.`
    },
    {
      "time": "1:20-1:25",
      "details": `Hablemos de cómo colaborar con otros contribuidores.

El open source no es un esfuerzo individual. Es comunidad.

Pueden comentar en issues de otras personas para ofrecer ayuda. "Yo trabajé en algo similar, si necesitas ayuda avísame".

Pueden revisar PRs de otros estudiantes. La revisión no la tengo que hacer solo yo. Si ven un PR y tienen sugerencias, pueden comentar.

Pueden trabajar en equipo en un mismo issue. Uno hace una parte, otro hace otra.

Y pueden compartir conocimiento. Si alguien preguntó algo en un issue y ustedes saben la respuesta, respondan.

Entre más participen, más aprenden. Y la comunidad se vuelve más fuerte.`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar.

Hoy aprendieron a navegar issues, filtrar por labels, comentar, asignarse tareas, y crear issues nuevos.

Ya tienen todas las herramientas. Saben hacer fork, saben hacer PR, saben navegar issues.

En la última clase del módulo van a hacer su contribución final. Van a elegir un issue, implementar la solución, abrir el PR, pasar por code review, y recibir aprobación.

Prepárense. La siguiente clase es la fiesta de merge.

Nos vemos en la próxima clase.`
    }
  ],
  'lesson-8-6': [
    {
      "time": "0:00-0:10",
      "details": `Bienvenidos a la última clase del módulo.

Hoy es el día. No es un simulacro. Hoy van a hacer una contribución real a un proyecto open source.

Pero primero, un repaso rápido de todo lo que aprendimos.

Clase 1: qué es open source, por qué contribuir, el flujo de contribución.

Clase 2: fork, clone, remotos origin y upstream, sincronización.

Clase 3: ramas, commits, push, Pull Request.

Clase 4: code review, feedback, aprobación y merge.

Clase 5: issues, labels, cómo elegir y comunicarse.

Y hoy, clase 6: la contribución final.

Van a elegir un issue, implementar la solución, abrir el PR, recibir code review, y si todo sale bien, su PR va a ser mergeado.

Su código va a estar en producción. Su nombre va a quedar en el historial del proyecto.

¿Listos? Vamos.`
    },
    {
      "time": "0:10-0:15",
      "details": `Antes de empezar a programar, cada uno va a elegir un issue.

Tienen tres opciones:

Opción 1: tomar un issue existente del repositorio. Pueden ser los issues que creamos en la clase anterior o los que ya estaban.

Opción 2: si en la clase anterior crearon un issue, pueden trabajar en su propio issue.

Opción 3: implementar una mejora que encontraron durante el módulo pero que no está reportada como issue.

El tamaño no importa. Un cambio de una línea es igual de valioso que un cambio de cien líneas. Lo importante es que sea real.

Tómense 5 minutos para decidir en qué van a trabajar. Si alguien no sabe qué elegir, levanten la mano y los ayudo.

\textit{Ayudar a quienes no tengan issue.}`
    },
    {
      "time": "0:15-0:45",
      "details": `Tienen 30 minutos para implementar su contribución.

Recuerden el flujo:

Primero, sincronicen su fork.

\`\`\`bash
git checkout main
git pull upstream main
git push origin main
\`\`\`

Segundo, creen una rama.

\`\`\`bash
git checkout -b feature/mi-mejora
\`\`\`

Tercero, implementen la solución. Usen su editor.

Cuarto, hagan commit.

\`\`\`bash
git add .
git commit -m "Descripción clara del cambio"
\`\`\`

Quinto, suban su rama.

\`\`\`bash
git push origin feature/mi-mejora
\`\`\`

Sexto, abran el Pull Request.

No se olviden de poner "Closes #[número]" en la descripción si están resolviendo un issue específico.

Yo voy a ir pasando por los asientos para ayudar.

\textit{Recorrer el aula.}`
    },
    {
      "time": "0:45-1:00",
      "details": `Vamos abriendo los Pull Requests.

Los que ya terminaron, abran su PR. Los que están cerca, terminen y abran.

Una vez que tengan el PR abierto, avísenme para que lo revise.

Mientras esperan, pueden ayudar a un compañero que esté atorado.

\textit{Esperar a que todos abran sus PRs.}`
    },
    {
      "time": "1:00-1:15",
      "details": `Voy a revisar los PRs en vivo.

\textit{Abrir cada PR, revisar, dejar comentarios si es necesario, aprobar.}

Este PR está bien. Buenos cambios, código limpio.

Request changes: aquí falta manejar este caso.

Aprobado: este está listo.

Voy a mergear los que están aprobados.

\textit{Mergear PRs uno por uno, celebrando cada merge.}

¡Felicidades! Su PR está mergeado. Su código ya está en el repositorio principal.

\textit{Continuar con los demás PRs.}`
    },
    {
      "time": "1:15-1:20",
      "details": `Vamos a celebrar.

Cada uno, díganos:

Su nombre, qué contribución hicieron, y cómo se sienten.

\textit{Dar la palabra a cada estudiante.}

Esto es enorme. Tienen su primera contribución open source.

Y esto es para siempre. Pueden ir a su perfil de GitHub y va a aparecer la contribución. Pueden mostrarlo en entrevistas.

Voy a tomar una captura de la página de Pull Requests para guardar el momento.

Todos los que tienen el merge, ya son oficialmente contribuidores open source.`
    },
    {
      "time": "1:20-1:25",
      "details": `Reflexionemos un momento.

Hace 6 clases, muchos de ustedes nunca habían hecho un fork. Nunca habían abierto un PR. Nunca habían recibido un code review.

Hoy tienen código en producción.

Esto no es un ejercicio. No es un proyecto simulado. Es real.

Cuando vayan a una entrevista de trabajo y les pregunten "¿has trabajado con git en equipo?", pueden decir que sí. Y mostrar sus PRs.

Cuando les pregunten "¿has contribuido a open source?", pueden decir que sí. Y mostrar el repositorio.

Esto los diferencia del 90% de los developers que aplican a esos trabajos.

Aplausos para todos.`
    },
    {
      "time": "1:25-1:30",
      "details": `Vamos a cerrar el módulo y el curso.

Esto no termina aquí. Contribuir a open source es un hábito, no un evento.

Sigan el repositorio en GitHub. Activen las notificaciones con Watch. Cuando vean un issue que puedan resolver, trabajen en él.

Exploren otros proyectos. GitHub tiene millones de repositorios open source. Busquen proyectos que les interesen y vean si tienen issues para principiantes.

Y recuerden: todos los grandes developers empezaron exactamente donde ustedes están hoy.

Nadie nace sabiendo. Todas las contribuciones, por pequeñas que sean, importan.

De estudiante a contribuidor.
De consumir a crear.
De aprender a enseñar.

Su código está en producción.
Su nombre está en el historial.
Son parte de algo más grande.

Felicitaciones.

¿Alguna pregunta final? ¿Algo que quieran compartir?

Nos vemos en el siguiente módulo.`
    }
  ]
};

