# instalación de swagger

## comandos para la instalación de swagger
composer require darkaonline/l5-swagger

php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"

## comando para la generación de la documentación de swagger

php artisan l5-swagger:generate