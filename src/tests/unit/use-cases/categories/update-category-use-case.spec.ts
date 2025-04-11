import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { UpdateCategoryUseCase } from "../../../../use-cases/categories/update-category.use-case";
import { createTestCategory } from "../../../utils/create-test.category";
import { faker } from "@faker-js/faker";

let categoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let updateCategoryUseCase: UpdateCategoryUseCase;

beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepository);
});

describe("Update Category Use Case", () => {
    it("should update a category name", async () => {
        const newName = faker.person.fullName();

        const { category } = await createTestCategory(createCategoryUseCase);

        const { category: updatedCategory } = await updateCategoryUseCase.execute(
            { id: category.id },
            { name: newName }
        )

        expect(updatedCategory.name).toBe(newName);
    });

    it("should throw an error if category name is empty string", async () => {
        await expect(() =>
            updateCategoryUseCase.execute(
                { id: faker.string.uuid() },
                { name: "" }
            )
        ).rejects.toThrow("Category name cannot be an empty string");
    });
});
