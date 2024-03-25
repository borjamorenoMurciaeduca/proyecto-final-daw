# Laravel

## Comandos iniciales

-   `composer install` Instalar dependencias
-   `php artisan migrate:fresh --seed` Crear una base de datos limpia con los seeds/datos
-   `php artisan serve` inicia el servidor

### Utilidades

-   `php artisan migrate:fresh` Crea una base de datos limpia
-   `php artisan make:controller Api/{name}` Crear un controlador en la carpeta Api/
-   `php artisan make:seeder {name}` Crear un nuevo seeder
-   `php artisan make:model {name` Crear un nuevo modelo
-   `php artisan make:migration {name` Crear una nueva migración

### Ejemplo de .env para mysql

```js
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=super
DB_PASSWORD=123
```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
