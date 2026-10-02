import "dotenv/config"; // Cargar variables de entorno desde el archivo .env
import cors from "cors";// Importar dependencias
import express from "express";// Importar dependencias
import mongoose from "mongoose";// Importar dependencias
import productsRoutes from "./products/productsRoutes.js";// Importar dependencias
import authRoutes from "./auth/authRoutes.js";// Importar dependencias

// Crear la aplicación Express
const app = express();

// Configuración de middlewares
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use("/products", productsRoutes);
app.use("/login", authRoutes);


// Conexión a MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log("Conectado a MongoDB");

// Iniciar el servidor
app.listen(3000, () => {
    console.log("API corriendo en el puerto 3000");
});

