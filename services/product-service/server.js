import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productsRoutes from "./productsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);

await mongoose.connect(process.env.MONGO_URI);
console.log("Product Service conectado a MongoDB");

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Product Service corriendo en el puerto ${PORT}`);
});