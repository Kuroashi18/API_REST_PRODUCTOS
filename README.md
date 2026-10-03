# API REST de Productos

Proyecto desarrollado con Node.js, Express, MongoDB y React. La aplicación utiliza una arquitectura de microservicios separando la autenticación y la gestión de productos, con comunicación entre servicios mediante REST.

## Arquitectura

El proyecto está dividido principalmente en:

- **Auth Service** — Puerto `3001`
  - Registro de usuarios.
  - Inicio de sesión.
  - Generación de JWT.
  - Validación de tokens.
  - Base de datos independiente `authDB`.

- **Product Service** — Puerto `3002`
  - Crear productos.
  - Listar productos.
  - Buscar productos por ID.
  - Actualizar productos.
  - Eliminar productos.
  - Validación de datos con Zod.
  - Base de datos independiente `productsDB`.
  - Valida los JWT comunicándose con Auth Service.
  - Logging estructurado con Pino.

- **Frontend** — React + Vite
  - Inicio de sesión.
  - Creación de productos.
  - Visualización de productos.
  - Comunicación con Auth Service y Product Service.

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- JWT
- Pino
- CORS

### Frontend

- React
- Vite
- TanStack Query
- React Hook Form
- Zod

### Testing

- Vitest
- Supertest
- Playwright

### Infraestructura

- Docker
- Docker Compose

## Docker

El proyecto incluye un archivo `docker-compose.yml` que permite ejecutar:

- Auth Service
- Product Service
- MongoDB para autenticación
- MongoDB para productos

Para iniciar los servicios:

```bash
docker compose up -d
```

Para comprobar el estado de los contenedores:

```bash
docker compose ps
```

## Tests

El proyecto cuenta con tests en diferentes niveles de la pirámide de testing.

### Test unitario

Se utiliza **Vitest** para probar los casos de uso del Product Service.

El repositorio de productos se reemplaza mediante mocks, por lo que el test unitario no utiliza la base de datos real.

### Test de integración

Se utiliza **Supertest** junto con Vitest para probar el endpoint:

```text
POST /products
```

El test verifica la petición HTTP, la validación del endpoint y la respuesta del servicio.

### Test End-to-End

Se utiliza **Playwright** para probar el flujo principal del frontend:

```text
Iniciar sesión
      ↓
Recibir JWT
      ↓
Crear producto
      ↓
Actualizar lista de productos
      ↓
Verificar que el producto aparece
```

## Ejecutar los tests

Antes del test End-to-End deben estar funcionando los microservicios y el frontend.

Iniciar los servicios:

```bash
docker compose up -d
```

Iniciar el frontend:

```bash
cd Frontend
npm run dev
```

Desde otra terminal, en la raíz del proyecto, ejecutar:

```bash
npm test
```

Este comando ejecuta:

```text
npm test
├── Tests del backend
│   ├── Test unitario con Vitest
│   └── Test de integración con Supertest
│
└── Test E2E
    └── Playwright
```

También se pueden ejecutar por separado:

```bash
npm run test:backend
```

```bash
npm run test:e2e
```

## Logging estructurado

Product Service utiliza **Pino** para generar logs estructurados en formato JSON.

Ejemplo:

```json
{
  "level": 30,
  "service": "product-service",
  "database": "productsDB",
  "msg": "Conectado a MongoDB"
}
```

Esto permite registrar información del servicio de una forma estructurada y fácil de procesar.

## Estructura principal

```text
API_REST_Productos/
├── Backend/
├── Frontend/
│   ├── src/
│   └── tests/
├── services/
│   ├── auth-service/
│   └── product-service/
│       └── tests/
│           ├── unit/
│           └── integration/
├── docker-compose.yml
├── package.json
├── .gitignore
└── README.md
```

## Ejecutar el proyecto

1. Levantar los microservicios y bases de datos:

```bash
docker compose up -d
```

2. Iniciar el frontend:

```bash
cd Frontend
npm run dev
```

3. Abrir el frontend en el navegador, normalmente en:

```text
http://localhost:5173
```

El sistema permite iniciar sesión, crear productos y consultar la lista de productos utilizando los microservicios correspondientes.