# API REST de Productos

Proyecto full stack desarrollado con React, Vite, Express, MongoDB y Mongoose.

## Cómo levantar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Kuroashi18/API_REST_PRODUCTOS.git
cd API_REST_PRODUCTOS
```

### 2. Levantar el backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` dentro de la carpeta `backend` con las siguientes variables:

```env
MONGO_URI=mongodb://localhost:27017/productosDB
JWT_SECRET=tu_clave_secreta
```

Asegurarse de que MongoDB esté ejecutándose y luego iniciar el servidor:

```bash
node --watch server.js
```

El backend estará disponible en:

```text
http://localhost:3000
```

### 3. Levantar el frontend

Abrir una segunda terminal y, desde la raíz del proyecto, entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo de Vite:

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

### 4. Usar la aplicación

Con el backend y el frontend ejecutándose al mismo tiempo, abrir en el navegador:

```text
http://localhost:5173
```

Desde la interfaz se pueden consultar los productos e iniciar sesión para crear nuevos productos.

## Reorganización del proyecto

El backend fue reorganizado por dominio y separado en capas. Las rutas reciben las peticiones HTTP, los servicios contienen la lógica de los casos de uso y los repositorios se encargan del acceso a MongoDB mediante Mongoose. Esto permite separar responsabilidades y evita que la lógica de negocio dependa directamente de Express o de la base de datos.

En el frontend, los componentes fueron separados de `App.jsx` y la lógica para consultar y crear productos se mantiene en hooks personalizados como `useProducts` y `useCreateProduct`. De esta forma, los componentes se enfocan principalmente en mostrar la interfaz.

## Arquitectura de microservicios

El backend fue dividido en dos servicios independientes:

- **Auth Service:** encargado del registro, inicio de sesión y validación de tokens JWT. Se ejecuta en el puerto `3001` y utiliza su propia base de datos `authDB`.
- **Product Service:** encargado de las operaciones CRUD de productos. Se ejecuta en el puerto `3002` y utiliza su propia base de datos `productsDB`.

Cada servicio tiene su propio `package.json`, servidor y conexión a MongoDB.

### Comunicación entre servicios

Los servicios se comunican mediante REST. Cuando se intenta crear un producto protegido, Product Service envía el token recibido a Auth Service mediante el endpoint `/validate`.

Auth Service valida el JWT y responde si el token es válido. De esta forma, Product Service no necesita encargarse directamente de la validación del JWT.

El flujo es:

`Cliente → Product Service → Auth Service → Product Service → productsDB`

### Docker

El proyecto utiliza Docker Compose para levantar los dos servicios y sus respectivas bases de datos.

Los contenedores utilizados son:

- `auth-service`
- `auth-db`
- `product-service`
- `product-db`

Para construir y levantar todo el proyecto desde la raíz se utiliza:

```bash
docker compose up --build
```

Una vez iniciado:

- Auth Service: `http://localhost:3001`
- Product Service: `http://localhost:3002`

Para detener los contenedores:

```bash
docker compose down
```

Los datos de MongoDB se almacenan en volúmenes de Docker para mantener la información aunque los contenedores sean detenidos.

## Estructura de los servicios

```text
services/
├── auth-service/
│   ├── Dockerfile
│   ├── server.js
│   ├── userModel.js
│   ├── package.json
│   └── package-lock.json
│
└── product-service/
    ├── Dockerfile
    ├── server.js
    ├── authMiddleware.js
    ├── productsModel.js
    ├── productsRepository.js
    ├── productsService.js
    ├── productsRoutes.js
    ├── package.json
    └── package-lock.json
```

La configuración general de los servicios y sus bases de datos se encuentra en el archivo `docker-compose.yml` ubicado en la raíz del proyecto.