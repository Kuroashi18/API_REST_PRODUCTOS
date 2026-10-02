import { useProduct } from '../hooks/useProducts';

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

export default ProductList;