import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateProduct } from '../hooks/useCreateProducts';

// Deine la validación del formulario usando Zod
const productSchema = z.object({
    name: z.string("El nombre es obligatorio")
        .regex(
            /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/,
            "El nombre debe contener letras"
        )
        .min(
            2,
            "El nombre debe tener al menos 2 caracteres"
        ),

    price: z.number("El precio debe ser un número")
        .positive("El precio debe ser un número positivo"),

    stock: z.number("El stock debe ser un número")
        .int("El stock debe ser un número entero")
        .min(
            0,
            "El stock debe ser un número mayor o igual a 0"
        )
});

// Componente ProductForm
function ProductForm({ token }) {
    const createProduct = useCreateProduct(token);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(productSchema),
        mode: "onChange"
    });

    const onSubmit = (data) => {
        createProduct.reset();

        createProduct.mutate(data, {
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginBottom: '1.5rem' }}
        >
            <h3>Nuevo producto</h3>

            <input
                {...register('name')}
                placeholder="Nombre"
            />
            {errors.name && (
                <p style={{ color: 'crimson' }}>
                    {errors.name.message}
                </p>
            )}

            <input
                {...register('price', { valueAsNumber: true })}
                placeholder="Precio"
            />
            {errors.price && (
                <p style={{ color: 'crimson' }}>
                    {errors.price.message}
                </p>
            )}

            <input
                {...register('stock', { valueAsNumber: true })}
                placeholder="Stock"
            />
            {errors.stock && (
                <p style={{ color: 'crimson' }}>
                    {errors.stock.message}
                </p>
            )}

            <button
                type="submit"
                disabled={createProduct.isPending}
            >
                {createProduct.isPending
                    ? 'Creando...'
                    : 'Crear producto'}
            </button>

            {createProduct.isError && (
                <p style={{ color: 'crimson' }}>
                    {createProduct.error.message}
                </p>
            )}

            {createProduct.isSuccess && (
                <p style={{ color: 'seagreen' }}>
                    Producto creado ✓
                </p>
            )}
        </form>
    );
}

export default ProductForm;