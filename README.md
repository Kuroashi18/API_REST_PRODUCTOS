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