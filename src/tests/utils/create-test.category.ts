import { faker } from "@faker-js/faker";
import { CreateCategoryUseCase } from "../../use-cases/categories/create-category.use-case";

export async function createTestCategory(createCategoryUseCase: CreateCategoryUseCase) {
    const name = faker.word.words();

    const { category } = await createCategoryUseCase.execute({
        name
    });

    return { category, name };
}
