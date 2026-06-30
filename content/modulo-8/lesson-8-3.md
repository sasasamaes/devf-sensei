---
title: Tu Primer Pull Request
duration: 90
sessionId: modulo-8--lesson-8-3
---

# Tu primer Pull Request

De cero a PR en 30 minutos.

---

## Ramas: por qué usarlas

```
main → siempre limpia, en producción
feature/mi-cambio → tus modificaciones
fix/typo-readme → correcciones
```

- Nunca trabajes directamente en main.
- Cada cambio va en su propia rama.
- La rama se convierte en el PR.

Note:
Analogía: main es el documento final.
Las ramas son borradores.

---

## Crear rama y hacer cambios

```bash
# Crear y moverte a una nueva rama
git checkout -b fix/typo-readme

# Hacer cambios en los archivos
# (usa tu editor favorito)
```

Nombres de rama:
- `fix/...` → correcciones
- `feature/...` → nuevas funcionalidades
- `docs/...` → documentación

Note:
Hacer en vivo: crear rama, editar un archivo.
Mostrar git status para ver los cambios.

---

## Commit

```bash
# Ver qué cambió
git status

# Agregar archivos al staging
git add .
git add README.md

# Hacer commit
git commit -m "Corregir typo en la sección de instalación"
```

Buenos mensajes de commit:
- "Corregir typo en README" ✓
- "Agregar validación de email en formulario de registro" ✓
- "fix" ✗
- "cambios" ✗

Note:
Explicar que los mensajes son comunicación con otros developers.
Deben entender qué cambió sin ver el código.

---

## Push a GitHub

```bash
git push origin fix/typo-readme
```

Esto sube tu rama a tu fork en GitHub.

Después del push, GitHub muestra automáticamente:

```
🔔 "fix/typo-readme" had recent pushes
   ──────────────────────────────
   [Compare & Pull Request]
```

Note:
Mostrar el botón que aparece en GitHub después del push.

---

## Abrir el Pull Request

Desde GitHub:

```
1. Click en "Compare & Pull Request"
2. Base: devf-sensei/sensei-platform ← main
3. Compare: TU_USUARIO/fix/typo-readme
4. Escribir título descriptivo
5. Escribir descripción
6. Click en "Create Pull Request"
```

Note:
Hacer en vivo. Explicar cada campo.
La descripción debe explicar qué cambió y por qué.

---

## ¿Qué pasa después?

```
PR abierto → Code Review → ¿Cambios? → Aprobación → Merge
```

- Yo voy a revisar tu PR.
- Puedo pedir cambios.
- Puedo aprobarlo directamente.
- Cuando está listo, lo mergeo.

Note:
Tranquilos si pido cambios. Es normal.
El code review es para ayudar, no para criticar.

---

## Ejercicio

1. Sincroniza tu fork (upstream).
2. Crea una rama.
3. Haz un cambio pequeño.
4. Commit con mensaje descriptivo.
5. Push a GitHub.
6. Abre tu Pull Request.

Note:
Dar tiempo. Ayudar a quienes se atoren.
