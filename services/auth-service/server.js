import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./userModel.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a la base de datos exclusiva de autenticación
await mongoose.connect(process.env.MONGO_URI);
console.log("Auth Service conectado a MongoDB");

// Registrar usuario
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                error: "El usuario ya existe"
            });
        }

        const user = await User.create({
            username,
            password
        });

        res.status(201).json({
            message: "Usuario registrado",
            username: user.username
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al registrar usuario"
        });
    }
});

// Iniciar sesión
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({
                error: "Credenciales inválidas"
            });
        }

        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({
            error: "Error al iniciar sesión"
        });
    }
});

// Validar token enviado por otro servicio
app.post("/validate", (req, res) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            valid: false,
            error: "Token requerido"
        });
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        res.json({
            valid: true,
            user: decoded
        });

    } catch (error) {
        res.status(401).json({
            valid: false,
            error: "Token inválido"
        });
    }
});

app.listen(3001, () => {
    console.log("Auth Service corriendo en el puerto 3001");
});