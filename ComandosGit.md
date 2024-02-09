# Comandos de git esenciales, recomendaciones y guía de estilos

## Rama principal
main</code>

## Traer cambios de la rama principal
Estando en main hacemos <code>git pull origin main</code> y <code>git fetch origin main</code> (no es necesario poner el <code>origin main</code> si ya estamos en <code>main</code>).

## Crear rama nueva
Desde la rama principal hacemos un <code>git checkout -b nombre-de-tu-rama`</code>

## Cambiar a una rama ya existente
Desde cualquier rama hacemos un <code>git checkout nombre-de-tu-rama`</code>

## Hacer commits y añadirlos al respositorio
- <code>git add .</code> para añadirlos
- <code>git commit -m "mensaje"</code> para commitear los cambios
- <code>git push origin nombre-de-tu-rama</code> para subir los cambios a tu rama remota

## Recomendaciones y guía de estilos
- La información de los commits tienen que ser representativa y significativa
- Se usarán pull request para que los miembros del equipo revisen lo que se sube y se mergea a la rama principal
- No se pueden hacer cambios directamente en la rama principal
- Se deben crear ramas de desarrollos cortos que se vayan mergeando a la rama principal
