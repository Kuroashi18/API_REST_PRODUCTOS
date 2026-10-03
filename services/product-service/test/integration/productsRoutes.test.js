import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

vi.mock("../../authMiddleware.js", () => ({
    requireAuth: (req, res, next) => {
        req.user = { username: "admin" };
        next();
    }
}));

vi.mock("../../productsService.js", () => ({
    getAllProductsService: vi.fn(),
    getProductByIdService: vi.fn(),
    createProductService: vi.fn(),
    updateProductService: vi.fn(),
    deleteProductService: vi.fn()
}));

import { createProductService } from "../../productsService.js";
import app from "../../app.js";

describe("POST /products", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe crear un producto y responder 201", async () => {

        const productData = {
            name: "Teclado",
            price: 2500,
            stock: 10
        };

        const createdProduct = {
            _id: "123",
            ...productData
        };

        createProductService.mockResolvedValue(createdProduct);

        const response = await request(app)
            .post("/products")
            .send(productData);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(createdProduct);

        expect(createProductService).toHaveBeenCalledWith(
            productData
        );
    });
});