import { describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { faker } from "@faker-js/faker";

describe("Create Category Use Case", () => {
    it("should create a category with a valid name", async () => {
        const categoriesRepository = new InMemoryCategoriesRepository();
        const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
        
        const name = faker.person.fullName();

        const { category } = await createCategoryUseCase.execute({
            name: name
        });

        expect(category).toHaveProperty("id");
        expect(typeof category.name).toBe("string");
        expect(category.name).toBe(name);
    });
});
