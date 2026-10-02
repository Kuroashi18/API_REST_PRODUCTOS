import express from "express";
import { z } from "zod";
import { requireAuth } from "../auth/authMiddleware.js";

import { getAllProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService } from "./productsService.js";

const router = express.Router();

// Schema de Zod para validar el body
const productSchema = z.object({
    name: z.string()
        .regex(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/, "El nombre debe contener letras")
        .min(2),
    price: z.number().positive(),
    stock: z.number().int().min(0)
});


// POST - Crear producto
router.post("/", requireAuth, async (req, res) => {

    const result = productSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.message
        });
    }

    const product = await createProductService(result.data);

    res.status(201).json(product);
});


// GET - Obtener todos los productos
router.get("/", async (req, res) => {

    const products = await getAllProductsService();

    res.json(products);
});


// GET - Obtener un producto por ID
router.get("/:id", async (req, res) => {

    try {

        const product = await getProductByIdService(req.params.id);

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
router.put("/:id", async (req, res) => {

    const result = productSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.flatten()
        });
    }

    try {

        const product = await updateProductService(
            req.params.id,
            result.data
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
router.delete("/:id", async (req, res) => {

    try {

        const product = await deleteProductService(req.params.id);

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


export default router;