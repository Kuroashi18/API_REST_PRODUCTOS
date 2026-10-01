import cors from "cors";
import express from "express";
import { z } from "zod";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = "mysecretkey";

const app = express();
app.use(cors());
app.use(express.json());


// Conexión a MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log("Conectado a MongoDB");

// Schema y modelo de Mongoose
const mongooseProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number }
});

const Product = mongoose.model("Product", mongooseProductSchema);


// Schema de Zod para validar el body
const productSchema = z.object({
    name: z.string().regex(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/, "El nombre debe contener letras").min(2),
    price: z.number().positive(),
    stock: z.number().int().min(0)
});

// GET - Obtener todos los productos
app.get("/products", async (req, res) => {

    const products = await Product.find();

    res.json(products);
});

// GET - Obtener un producto por ID
app.get("/products/:id", async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.json(product);

    } catch (error) {

        res.status(400).json({
            error: "ID inválido"
        });
    }
});


// POST - Crear producto
app.post("/products", requireAuth, async (req, res) => {

    const result = productSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.message
        });
    }

    const product = await Product.create(result.data);

    res.status(201).json(product);
});


// PUT - Actualizar producto
app.put("/products/:id", async (req, res) => {

    const result = productSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.flatten()
        });
    }

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            result.data,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.json(product);

    } catch (error) {

        res.status(400).json({
            error: "ID inválido"
        });
    }
});


// DELETE - Eliminar producto
app.delete("/products/:id", async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.json({
            message: "Producto eliminado correctamente"
        });

    } catch (error) {

        res.status(400).json({
            error: "ID inválido"
        });
    }
});

// LOGIN - Iniciar sesión

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (username !== "admin" || password !== "123456") {
        return res.status(401).json({
            error: "Credenciales inválidas"
        });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware para verificar el token JWT

function requireAuth(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Token requerido"
        });
    }

    try {
        req.user = jwt.verify(
            header.split(" ")[1],
            JWT_SECRET
        );

        next();

    } catch (error) {
        return res.status(401).json({
            error: "Token inválido"
        });
    }
}

app.listen(3000, () => {
    console.log("API corriendo en el puerto 3000");
});

