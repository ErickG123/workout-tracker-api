import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { FindCategoryUseCase } from "../../../../use-cases/categories/find-category.use-case";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { faker } from "@faker-js/faker";
import { CategoryNotFound } from "../../../../use-cases/errors/category-not-found.error";
import { createTestCategory } from "../../../utils/create-test.category";

let categoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let findCategoryUseCase: FindCategoryUseCase;

beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    findCategoryUseCase = new FindCategoryUseCase(categoriesRepository);
});

describe("Find Category Use Case", () => {
    it("should return a category by id", async () => {
        const { category } = await createTestCategory(createCategoryUseCase)

        const { category: existingCategory } = await findCategoryUseCase.execute({
            id: category.id
        });

        expect(existingCategory).toBeDefined();
        expect(existingCategory?.id).toBe(category.id);
        expect(existingCategory?.name).toBe(category.name);
    });

    it("should return undefined if category not found", async () => {
        const uuid = faker.string.uuid();

        await expect(() =>
            findCategoryUseCase.execute({ id: uuid })
        ).rejects.toBeInstanceOf(CategoryNotFound)
    });
});
