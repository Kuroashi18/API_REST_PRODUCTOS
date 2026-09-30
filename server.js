import express from "express";
import { z } from "zod";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());


// Conexión a MongoDB
await mongoose.connect(process.env.MONGO_URI);

// Schema y modelo de Mongoose
const mongooseProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
});

const Product = mongoose.model("Product", mongooseProductSchema);


// Schema de Zod para validar el body
const productSchema = z.object({
    name: z.string().min(2),
    price: z.number().positive(),
    stock: z.number().int().min(0)
});


// POST - Crear producto
app.post("/products", async (req, res) => {

    const result = productSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.message
        });
    }

    const product = await Product.create(result.data);

    res.status(201).json(product);
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


app.listen(3000, () => {
    console.log("API corriendo en el puerto 3000");
});


