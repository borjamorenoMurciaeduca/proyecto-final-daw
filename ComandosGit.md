# Comandos de git esenciales

## Rama principal
main

## Traer cambios de la rama principal
<code>Estando en main hacemos `git pull origin main` y `git fetch origin main` (no es necesario poner el `origin main` si ya estamos en main). </code>

## Crear rama nueva
<code>Desde la rama principal hacemos un `git checkout -b nombre-de-tu-rama`</code>

## Cambiar a una rama ya existente
<code>Desde cualquier rama hacemos un `git checkout nombre-de-tu-rama`</code>

## Hacer commits y añadirlos al respositorio
- <code>`git commit -m "mensaje"` para commitear los cambios</code>
- <code>`git add .` para añadirlos</code>
- <code>`git push origin nombre-de-tu-rama` para subir los cambios a tu rama remota</code>

## Recomendaciones y guía de estilos
- La información de los commits tienen que ser representativa y significativa
- Se usarán pull request para que los miembros del equipo revisen lo que se sube y se mergea a la rama principal
- No se pueden hacer cambios directamente en la rama principal
- Se deben crear ramas de desarrollos cortos que se vayan mergeando a la rama principal
