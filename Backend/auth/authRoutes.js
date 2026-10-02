import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Ruta de autenticación
router.post("/", (req, res) => {
    const { username, password } = req.body;

    if (username !== "admin" || password !== "123456") {
        return res.status(401).json({
            error: "Credenciales inválidas"
        });
    }

    const token = jwt.sign(
        { username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

export default router;