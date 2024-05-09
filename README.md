# Proyecto final DAW 2024 - IdealistaWatch

Detalles para puesta en marcha del proyecto IdealistaWatch

# Configuración básica de la máquina

- Apache
- MySQL, phpMyAdmin
- python (https y parsel como dependencias)

```bash
$ sudo apt install apache2 mysql-server php libapache2-mod-php php-mysql
$ sudo apt install phpmyadmin
$ sudo apt install python3
$ sudo apt install python3-pip
$ pip install httpx parsel
```

_Comprobamos que el archivo ./backend/storage/python-scrapping.py tiene privilegios de lectura y ejecución, de no ser así ejecturar `$ chmod +rx python-scrapping.py`_

_Debemos tener un usuario en mysql con todos los privilegios habilitados_

### Laravel y composer

```bash
$ php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
$ sudo mv composer.phar /usr/local/bin/composer
```

- En ./backend debemos tener un archivo .env con al menos esta configuración para el correcto funcionamiento con mysql

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE={nombre_base_datos}
DB_USERNAME={nombre_usuario}
DB_PASSWORD={password_usuario}
```

_Se modifica por datos reales, tales como el nombre de la bbd y el usuario con privilegios de mysql junto su contraseña_

### React (Node y pnpm)

- Node v20.13.0
- pnpm

```bash
$ curl -fsSL https://fnm.vercel.app/install | bash
$ fnm install --lts
$ curl -fsSL https://get.pnpm.io/install.sh | sh -
```

_En este ejemplo instalamos un gestor de versiones de node llamado fnm_

## Iniciación de la APP

- Instalación/iniciación **Laravel**

```bash
$ cd ./backend
$ composer install
$ php artisan migrate
( Aceptamos la creación de la tabla)
$ php artisan migrate:fresh --seed`
$ php artisan serve
```

_En caso de que tengamos la tabla creada, $php artisan migrate no es necesario ejecutarlo_

_Una vez tengamos los pasos previos siempre que queramos iniciar la api lo haremos `$ php artisan serve`_

- Instalación/iniciación **React**

```bash
$ cd ./front
$ pnpm i
$ pnpm dev
```

- En ./front tendremos un archivo .env que apunta a la api, en caso de cambiar la dirección de nuestra api tan solo tenemos que cambiarlo en este archivo, tendremos la dirección centralizada en una variable de entorno

```
VITE_API_URL= 'xxxx/api/'
```

- Para compilar y exportar el proyecto `$ pnpm build`
