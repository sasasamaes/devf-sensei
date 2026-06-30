---
title: useContext y estado global
duration: 90
sessionId: modulo-7--lesson-7-3
---

# Estado global en React

¿Por qué necesitamos estado global?

- Pasar props por múltiples niveles es tedioso.
- Componentes distantes necesitan los mismos datos.
- Estado de autenticación, tema, idioma.

Note:
Explicar el problema de "prop drilling".
Preguntar si han tenido que pasar props 3+ niveles.

---

## ¿Qué es Context API?

Solución nativa de React para compartir datos sin props.

```jsx
// 1. Crear contexto
const UserContext = createContext();

// 2. Proveer valor
<UserContext.Provider value={{ user, login }}>
  <App />
</UserContext.Provider>

// 3. Consumir
const { user } = useContext(UserContext);
```

Note:
Dibujar el árbol de componentes antes y después de Context.
Mostrar que el Provider envuelve y cualquier hijo puede consumir.

---

## Tema: ejemplo práctico

```jsx
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
      <button onClick={() => setTheme('dark')}>
        Modo oscuro
      </button>
    </header>
  );
}
```

Note:
Empezar con este ejemplo simple.
Hacer que los estudiantes lo repliquen.
Mostrar el cambio en vivo.

---

## UserContext: login/logout

```jsx
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

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
```

Note:
Explicar que el estado de sesión vive aquí.
El login es simulado — solo guarda un objeto.
Conectar con el blog: solo usuarios logueados crean posts.

---

## Consumir en componentes

```jsx
function NavBar() {
  const { user, login, logout } = useContext(UserContext);

  if (!user) {
    return (
      <button onClick={() => login('alumno@devf.com')}>
        Iniciar sesión
      </button>
    );
  }

  return (
    <div>
      <span>Bienvenido, {user.name}</span>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
```

Note:
Mostrar que el mismo contexto se consume en NavBar y en cualquier otro lado.
Discutir cuándo conviene separar contextos.

---

## Persistencia con localStorage

```jsx
useEffect(() => {
  const saved = localStorage.getItem('user');
  if (saved) setUser(JSON.parse(saved));
}, []);

useEffect(() => {
  if (user) localStorage.setItem('user', JSON.stringify(user));
  else localStorage.removeItem('user');
}, [user]);
```

Note:
Preguntar: ¿qué pasa si recargan la página?
La sesión se pierde — localStorage la persiste.
Mostrar la recarga con y sin persistencia.

---

## Ejercicio

Crea un contexto de usuario para tu blog:

1. UserProvider con estado, login y logout.
2. NavBar que cambia según el usuario.
3. Persistencia con localStorage.
4. Solo usuarios logueados ven el botón "Nuevo post".

Note:
Dar tiempo para el ejercicio.
Caminar y resolver dudas.
Mostrar la solución completa al final.

---

# Resumen

- Context API resuelve el prop drilling.
- createContext + Provider + useContext.
- El estado de sesión es un caso de uso ideal.
- localStorage persiste la sesión entre recargas.
- En la siguiente clase conectaremos con Express.

Note:
Preguntar si hay dudas.
Adelantar que la siguiente clase es backend con Express.
