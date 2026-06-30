---
title: Formularios controlados y React Hook Form
duration: 90
sessionId: modulo-7--lesson-7-1
---

# Formularios controlados

¿Por qué manejar formularios en React es diferente?

- El DOM ya no es la fuente de verdad.
- React controla el estado de cada input.
- Validación y feedback en tiempo real.

---

## Inputs controlados vs no controlados

```jsx
// No controlado: el DOM guarda el valor
<input type="text" defaultValue="Hola" />

// Controlado: React guarda el valor
const [name, setName] = useState('');
<input value={name} onChange={e => setName(e.target.value)} />
```

Note:
Explicar la diferencia clara entre controlled y uncontrolled.
Mencionar que controlled es el patrón más común en React.

---

## Problemas con formularios manuales

- Repetir `onChange` en cada input.
- Manejar errores uno por uno.
- Validación dispersa en el componente.
- Código difícil de escalar.

Note:
Pedir a los estudiantes que mencionen un formulario que hayan creado.
Identificar puntos de fricción.

---

# React Hook Form

Librería para manejar formularios con menos código y mejor performance.

```bash
npm install react-hook-form
```

Note:
Mostrar la instalación en vivo.
Explicar que minimiza re-renders.

---

## Conceptos clave

```jsx
import { useForm } from 'react-hook-form';

function PostForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: true })} />
      {errors.title && <span>Título requerido</span>}
      <button type="submit">Guardar</button>
    </form>
  );
}
```

Note:
Explicar register, handleSubmit y errors.
Mostrar el ejemplo en vivo y pedir que lo repliquen.

---

## Validaciones comunes

```jsx
<input
  {...register('email', {
    required: 'Email requerido',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Email inválido',
    },
    minLength: {
      value: 5,
      message: 'Mínimo 5 caracteres',
    },
  })}
/>
```

Note:
Revisar cada regla con calma.
Mostrar los mensajes de error personalizados.

---

## Ejercicio

Crea un formulario de "nuevo post" con:

1. Título (requerido, mínimo 5 caracteres).
2. Contenido (requerido, mínimo 20 caracteres).
3. Autor (requerido).
4. Mostrar errores de validación.

Note:
Dar tiempo para el ejercicio.
Caminar por el aula y resolver dudas.
Compartir una solución al final.

---

# Resumen

- Inputs controlados son el patrón estándar en React.
- React Hook Form simplifica registro, validación y errores.
- `register`, `handleSubmit` y `errors` son la base.
- El formulario de nuevo post será el punto de partida para el backend.

Note:
Conectar con la siguiente clase: consumo de APIs.
Preguntar si hay dudas antes de cerrar.
