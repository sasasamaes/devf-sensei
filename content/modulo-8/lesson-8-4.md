---
title: Code Review y Feedback
duration: 90
sessionId: modulo-8--lesson-8-4
---

# Code Review

Aprende de los comentarios y mejora tu código.

---

## ¿Qué es el code review?

Es cuando otro developer revisa tu código.

Propósitos:
- Encontrar errores antes de producción.
- Compartir conocimiento entre el equipo.
- Mantener consistencia en el código.
- Aprender nuevas formas de hacer las cosas.

No es personal. Es sobre el código, no sobre ti.

Note:
Preguntar: ¿Cómo se sienten al saber que alguien va a revisar su código?
Es normal tener nervios al principio.

---

## Tipos de comentarios

GitHub tiene 3 tipos de feedback:

```
💬 Comment → solo un comentario, no bloquea
⛔ Request Changes → hay que hacer cambios
✅ Approve → está listo para mergear
```

Note:
Mostrar cada tipo en un PR real.
Comment es como "buen trabajo, pero podríamos..."
Request changes es obligatorio resolver antes del merge.

---

## Cómo recibir feedback

Cuando recibes comentarios en tu PR:

1. ✅ Lee con mente abierta.
2. ✅ Pregunta si no entiendes.
3. ✅ Haz los cambios sugeridos.
4. ✅ Responde a cada comentario.
5. ✅ Da las gracias por la revisión.

```
"Gracias por la sugerencia, tiene sentido.
Ya lo corregí en el último commit."
```

Note:
El feedback es un regalo. Te hace mejor developer.
Nadie nace sabiendo.

---

## Actualizar un PR

```bash
# Ir a tu rama
git checkout fix/typo-readme

# Hacer los cambios solicitados
# (editar archivos)

# Commit y push
git add .
git commit -m "Corregir según code review"
git push origin fix/typo-readme
```

El PR se actualiza automáticamente.
No necesitas abrir un nuevo PR.

Note:
Mostrar cómo los commits nuevos aparecen en el PR automáticamente.

---

## Aprobación y merge

Cuando el PR está listo:

```
✅ Code Review pasa
✅ Tests pasan (si hay)
✅ Sin conflictos
```

¿Quién aprueba? El maintainer del proyecto (yo).

¿Quién mergea? El maintainer (yo).

Nota: en algunos proyectos tú puedes mergear tu propio PR.
En este proyecto, yo apruebo y mergeo.

Note:
Explicar que cada proyecto tiene sus reglas.
Este proyecto es supervisado porque están aprendiendo.

---

## Después del merge

Una vez que tu PR está mergeado:

```bash
# Sincronizar tu fork
git checkout main
git pull upstream main
git push origin main

# Borrar la rama del PR
git branch -d fix/typo-readme
git push origin --delete fix/typo-readme
```

Mantén tu fork limpio.

Note:
Mostrar cómo borrar ramas locales y remotas.

---

## Ejercicio

1. Revisa los comentarios en tu PR.
2. Aplica los cambios solicitados.
3. Haz commit y push.
4. Responde a los comentarios.
5. Solicita una nueva revisión.

Note:
Dar tiempo para que todos actualicen sus PRs.
