import { describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { DeleteCategoryUseCase } from "../../../../use-cases/categories/delete-category.use-case";
import { faker } from "@faker-js/faker";

describe("Delete Category Use Case", () => {
    it("should delete a category", async () => {
        const categoriesRepository = new InMemoryCategoriesRepository();
        const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
        const deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository);

        const name = faker.person.fullName();

        const { category } = await createCategoryUseCase.execute({
            name: name
        });

        await deleteCategoryUseCase.execute({
            id: category.id
        });

        const found = await categoriesRepository.findById(category.id);

        expect(found).toBeNull();
    });
});
