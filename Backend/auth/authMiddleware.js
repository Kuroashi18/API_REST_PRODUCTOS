import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para requerir autenticación
export function requireAuth(req, res, next) {
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