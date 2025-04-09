import { describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { FindAllCategoriesUseCase } from "../../../../use-cases/categories/find-all-categories.use-case";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { faker } from "@faker-js/faker";

describe("Find All Categories Use Case", () => {
    it("should return all categories", async () => {
        const categoriesRepository = new InMemoryCategoriesRepository();
        const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
        const findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoriesRepository);

        const name = faker.person.fullName();
        const otherName = faker.person.fullName();

        await createCategoryUseCase.execute({
            name: name
        });

        await createCategoryUseCase.execute({
            name: otherName
        });

        const { categories } = await findAllCategoriesUseCase.execute();

        expect(categories.length).toBe(2);
        expect(categories[0]).toHaveProperty("id");
        expect(categories[0].name).toBe(name);
        expect(categories[1]).toHaveProperty("id");
        expect(categories[1].name).toBe(otherName);
    });

    it("should return an empty array if no categories exist", async () => {
        const categoriesRepository = new InMemoryCategoriesRepository();
        const findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoriesRepository);

        const categories = await findAllCategoriesUseCase.execute();

        expect(categories).toEqual({ categories: [] });
    });
});
