import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = "http://localhost:3000";
const ENDPOINT = "/products";

export function useCreateProduct(token) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newProduct) => {
            const response = await fetch(`${API_URL}${ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) {
                const body = await response.json().catch(() => ({}));
                console.error("Error creando products:", body.error || response.statusText);
                throw new Error(body.error?.message || body.error || 'Error creando producto');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            });
        }
    });
}