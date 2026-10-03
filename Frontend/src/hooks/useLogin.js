import { useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:3001";

export function useLogin() {
    return useMutation({
        mutationFn: async (credentials) => {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const body = await response.json().catch(() => ({}));
                throw new Error(body.error || "Error al iniciar sesión");
            }

            return response.json();
        }
    });
}