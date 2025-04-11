import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { FindAllCategoriesUseCase } from "../../../../use-cases/categories/find-all-categories.use-case";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { createTestCategory } from "../../../utils/create-test.category";

let categoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let findAllCategoriesUseCase: FindAllCategoriesUseCase;

beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoriesRepository);
});

describe("Find All Categories Use Case", () => {
    it("should return all categories", async () => {
        await createTestCategory(createCategoryUseCase);
        await createTestCategory(createCategoryUseCase);

        const { categories } = await findAllCategoriesUseCase.execute();

        expect(categories.length).toBe(2);
        expect(categories[0]).toHaveProperty("id");
        expect(categories[1]).toHaveProperty("id");
    });

    it("should return an empty array if no categories exist", async () => {
        const { categories } = await findAllCategoriesUseCase.execute();

        expect(categories).toEqual([]);
    });
});
