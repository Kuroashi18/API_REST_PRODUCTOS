export async function requireAuth(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Token requerido"
        });
    }

    try {
        const response = await fetch(
            `${process.env.AUTH_SERVICE_URL}/validate`,
            {
                method: "POST",
                headers: {
                    Authorization: authorization
                }
            }
        );

        const data = await response.json();

        if (!response.ok || !data.valid) {
            return res.status(401).json({
                error: data.error || "Token inválido"
            });
        }

        req.user = data.user;

        next();

    } catch (error) {
        return res.status(503).json({
            error: "Servicio de autenticación no disponible"
        });
    }
}