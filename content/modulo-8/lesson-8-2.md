---
title: Fork, Clone y Remotos
duration: 90
sessionId: modulo-8--lesson-8-2
---

# Fork y configuración

Tu copia personal del proyecto.

---

## ¿Qué es un fork?

Un fork es una copia del repositorio en tu cuenta de GitHub.

```
Repositorio Original (upstream)
    ↓ Fork
Tu Repositorio (origin)
    ↓ Clone
Tu Máquina Local
```

Note:
Explicar con analogía: fotocopia de un libro.
Tú tienes tu copia, puedes escribir en ella sin afectar el original.

---

## Hacer fork desde GitHub

```
1. Ir al repositorio original
2. Click en "Fork" (arriba a la derecha)
3. Elegir tu cuenta
4. ¡Listo!
```

Note:
Hacer el fork en vivo.
Mostrar que ahora tienen el repositorio en su cuenta.

---

## Clonar el fork

```bash
# Con gh CLI
gh repo clone TU_USUARIO/sensei-platform

# Con git
git clone https://github.com/TU_USUARIO/sensei-platform.git
cd sensei-platform
```

Note:
Explicar que clonar = descargar a tu máquina.
Ya pueden editar archivos localmente.

---

## Remotos: origin y upstream

```
origin → TU fork (tienes permisos de escritura)
upstream → repositorio ORIGINAL (solo lectura)
```

```bash
git remote add upstream https://github.com/devf-sensei/sensei-platform.git

# Verificar
git remote -v
```

Note:
Explicar que origin es como tu copia personal.
Upstream es el libro original del que sacaste la fotocopia.

---

## Sincronizar fork

Siempre ANTES de empezar a trabajar:

```bash
git checkout main
git pull upstream main
git push origin main
```

1. Cambiar a main
2. Traer cambios del original
3. Subir cambios a tu fork

Note:
Esto evita conflictos.
Háganlo siempre que vayan a empezar una nueva contribución.

---

## Ejercicio

1. Haz fork del repositorio.
2. Clónalo a tu máquina.
3. Agrega el remoto upstream.
4. Verifica con git remote -v.
5. Trae los últimos cambios.

Note:
Dar tiempo para el ejercicio.
Verificar que todos tengan ambos remotos configurados.
