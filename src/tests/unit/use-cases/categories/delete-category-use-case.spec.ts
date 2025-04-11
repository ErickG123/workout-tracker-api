import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../repositories/in-memory/in-memory-categories.repository";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { DeleteCategoryUseCase } from "../../../../use-cases/categories/delete-category.use-case";
import { createTestCategory } from "../../../utils/create-test.category";

let categoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let deleteCategoryUseCase: DeleteCategoryUseCase;

beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository);
});

describe("Delete Category Use Case", () => {
    it("should delete a category", async () => {
        const { category } = await createTestCategory(createCategoryUseCase);

        await deleteCategoryUseCase.execute({
            id: category.id
        });

        const found = await categoriesRepository.findById(category.id);

        expect(found).toBeNull();
    });
});
