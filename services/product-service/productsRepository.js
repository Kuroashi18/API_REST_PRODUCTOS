import Product from "./productsModel.js";

// Funcion para obtener todos los productos
export async function getAllProducts() {
    return await Product.find();
}

// Función para obtener un producto por ID
export async function getProductById(id) {
    return await Product.findById(id);
}

// Función para crear un producto
export async function createProduct(data) {
    return await Product.create(data);
}

// Función para actualizar un producto
export async function updateProduct(id, data) {
    return await Product.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
}

// Función para eliminar un producto
export async function deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
}