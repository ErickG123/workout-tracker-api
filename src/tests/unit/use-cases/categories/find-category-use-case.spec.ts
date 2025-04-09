import { describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { FindCategoryUseCase } from "../../../../use-cases/categories/find-category.use-case";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { faker } from "@faker-js/faker";
import { CategoryNotFound } from "../../../../use-cases/errors/category-not-found.error";

describe("Find Category Use Case", () => {
    it("should return a category by id", async () => {
        const categoriesRepository = new InMemoryCategoriesRepository();
        const findCategoryUseCase = new FindCategoryUseCase(categoriesRepository);
        const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

        const name = faker.person.fullName();

        const { category } = await createCategoryUseCase.execute({
            name: name
        });

        const { category: existingCategory } = await findCategoryUseCase.execute({
            id: category.id
        });

        expect(existingCategory).toBeDefined();
        expect(existingCategory?.id).toBe(category.id);
        expect(existingCategory?.name).toBe(category.name);
    });

    it("should return undefined if category not found", async () => {
        const categoriesRepository = new InMemoryCategoriesRepository();
        const findCategoryUseCase = new FindCategoryUseCase(categoriesRepository);

        const uuid = faker.string.uuid();

        await expect(() =>
            findCategoryUseCase.execute({ id: uuid })
        ).rejects.toBeInstanceOf(CategoryNotFound)
    });
});
