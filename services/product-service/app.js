import express from "express";
import cors from "cors";
import productsRoutes from "./productsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);

export default app;