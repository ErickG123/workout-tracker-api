import { describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { UpdateCategoryUseCase } from "../../../../use-cases/categories/update-category.use-case";
import { faker } from "@faker-js/faker";

describe("Update Category Use Case", () => {
    it("should update a category name", async () => {
        const categoriesRepository = new InMemoryCategoriesRepository();
        const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
        const updateCategoryUseName = new UpdateCategoryUseCase(categoriesRepository);

        const name = faker.person.fullName();
        const newName = faker.person.fullName();

        const { category } = await createCategoryUseCase.execute({
            name: name
        });

        const { category: updatedCategory } = await updateCategoryUseName.execute(
            { id: category.id },
            { name: newName }
        )

        expect(updatedCategory.name).toBe(newName);
    });

    it("should throw an error if category name is empty string", async () => {
        const categoriesRepository = new InMemoryCategoriesRepository();
        const updateCategoryUseName = new UpdateCategoryUseCase(categoriesRepository);

        await expect(() => 
            updateCategoryUseName.execute(
                { id: faker.string.uuid() },
                { name: "" }
            )
        ).rejects.toThrow("Category name cannot be an empty string");
    });
});
