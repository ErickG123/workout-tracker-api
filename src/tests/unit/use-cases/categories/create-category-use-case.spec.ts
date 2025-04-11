import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { createTestCategory } from "../../../utils/create-test.category";

let categoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
});

describe("Create Category Use Case", () => {
    it("should create a category with a valid name", async () => {
        const { category } = await createTestCategory(createCategoryUseCase);

        expect(category).toHaveProperty("id");
        expect(typeof category.name).toBe("string");
    });

    it("should throw an error if the name is empty string", async () => {
        await expect(() =>
            createCategoryUseCase.execute({ name: "" })
        ).rejects.toThrow("Category name cannot be an empty string");
    });
});
