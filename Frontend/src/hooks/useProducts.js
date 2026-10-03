import {useQuery} from '@tanstack/react-query';

const API_URL = "http://localhost:3002";
const ENDPOINT = "/products";

export function useProduct() {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}${ENDPOINT}`);
            if (!response.ok) {
                throw new Error('Error cargando productos');
            }
            return response.json();
        },
    });
}