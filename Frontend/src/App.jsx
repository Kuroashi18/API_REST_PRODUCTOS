import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProduct } from './hooks/useProducts';
import { useCreateProduct } from './hooks/useCreateProducts';
import { useLogin } from './hooks/useLogin';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

const productSchema = z.object({
    name: z.string("El nombre es obligatorio").regex(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/, "El nombre debe contener letras").min(2, "El nombre debe tener al menos 2 caracteres"),
    price: z.number("El precio debe ser un número").positive("El precio debe ser un número positivo"),
    stock: z.number("El stock debe ser un número").int("El stock debe ser un número entero").min(0, "El stock debe ser un número mayor o igual a 0")
});

function ProductList() {
    const { data, isLoading, isError } = useProduct();

    if (isLoading) {
        return <p>Cargando productos...</p>;
    }

    if (isError) {
        return <p>Error al cargar los productos</p>;
    }

    if (!data?.length) {
        return <p>No hay productos disponibles</p>;
    }

    return (
        <ul>
            {data.map(product => (
                <li key={product._id ?? product.id}>
                    {product.name} - ${product.price} - Stock: {product.stock}
                </li>
            ))}
        </ul>
    );
}

function LoginForm({ onLoggedIn }) {
    const login = useLogin();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {login.mutate(data, {onSuccess: (result) => { onLoggedIn(result.token) }})};

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '1.5rem' }}>
            <h3>Iniciar sesión</h3>
            <input {...register('username', { required: true })} placeholder="Usuario" />
            <input {...register('password', { required: true })} type="password" placeholder="Contraseña" />
            <button type="submit" disabled={login.isPending}>
                {login.isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
            {login.isError && (<p style={{ color: 'crimson' }}>{login.error.message}</p>)}
        </form>
    );
}


function ProductForm({token}) {
    const createProduct = useCreateProduct(token);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(productSchema)
    });

    const onSubmit = async (data) => {
        createProduct.mutate(data, {onSuccess: () => {reset()}})
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '1.5rem' }}>
            <h3>Nuevo producto</h3>
            <input {...register('name')} placeholder="Nombre" />
            {errors.name && <p style={{ color: 'crimson' }}>{errors.name.message}</p>}
            <input {...register('price', { valueAsNumber: true })} placeholder="Precio" />
            {errors.price && <p style={{ color: 'crimson' }}>{errors.price.message}</p>}
            <input {...register('stock', { valueAsNumber: true })} placeholder="Stock" />
            {errors.stock && <p style={{ color: 'crimson' }}>{errors.stock.message}</p>}
            <button type="submit" disabled={createProduct.isPending}>
                {createProduct.isPending ? 'Creando...' : 'Crear producto'}
            </button>
            {createProduct.isError && (<p style={{ color: 'crimson' }}>{createProduct.error.message}</p>)}
            {createProduct.isSuccess && (<p style={{ color: 'seagreen' }}>Producto creado ✓</p>)}
        </form>
    );
};


function App() {
    const [token, setToken] = useState(null);

    return (
        <div style={{ maxWidth: 480, margin: '2rem auto', fontFamily: "sans-serif" }}>
            <h1>Productos</h1>
            {!token ? (
                <LoginForm onLoggedIn={setToken} />
            ) : (
                <>
                    <p style={{ color: 'seagreen' }}>Sesión iniciada ✓</p>
                    <button onClick={() => setToken(null)} style={{ margin: '1rem 0' }}>
                        Cerrar sesión
                    </button>

                    <ProductForm token={token} />
                </>
            )}

            <hr />
            <h2>Lista de productos</h2>
            <ProductList />
        </div>
    )
}
export default App
