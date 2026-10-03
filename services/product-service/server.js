import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./logger.js";


await mongoose.connect(process.env.MONGO_URI);

logger.info(
    {
        service: "product-service",
        database: "productsDB"
    },

    "Conectado a MongoDB"
);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    logger.info(
        {
            service: "product-service",
            port: PORT
        },

        "Product Service iniciado"
    );
});