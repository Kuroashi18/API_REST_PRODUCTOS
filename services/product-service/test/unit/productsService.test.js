import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../productsRepository.js", () => ({
    getAllProducts: vi.fn(),
    getProductById: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn()
}));

import { createProduct } from "../../productsRepository.js";
import { createProductService } from "../../productsService.js";

describe("createProductService", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe crear un producto usando el repositorio", async () => {

        const productData = {
            name: "Monitor",
            price: 8500,
            stock: 5
        };

        const expectedProduct = {
            _id: "123",
            ...productData
        };

        createProduct.mockResolvedValue(expectedProduct);

        const result = await createProductService(productData);

        expect(createProduct).toHaveBeenCalledWith(productData);
        expect(createProduct).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedProduct);
    });
});