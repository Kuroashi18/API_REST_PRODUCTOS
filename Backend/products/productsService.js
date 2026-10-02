import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./productsRepository.js";

//funcion para obtener todos los productos
export async function getAllProductsService() {
    return await getAllProducts();
}

//funcion para obtener un producto por id
export async function getProductByIdService(id) {
    return await getProductById(id);
}

//funcion para crear un producto
export async function createProductService(data) {
    return await createProduct(data);
}

//funcion para actualizar un producto
export async function updateProductService(id, data) {
    return await updateProduct(id, data);
}

//funcion para eliminar un producto
export async function deleteProductService(id) {
    return await deleteProduct(id);
}