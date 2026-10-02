import mongoose from "mongoose";


// Schema y modelo de Mongoose
const mongooseProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number }
});

// Crear el modelo de Mongoose
const Product = mongoose.model("Product", mongooseProductSchema);

export default Product;