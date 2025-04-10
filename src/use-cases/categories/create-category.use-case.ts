import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/categories.repository";
import { validateNonEmptyString } from "../../lib/validators/validate-non-empty-string";

interface CreateCategoryUseCaseRequest {
    name: string
}

interface CreateCategoryUseCaseResponse {
    category: Category
}

export class CreateCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute({ name }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
        validateNonEmptyString(name, "Category name");

        const category = await this.categoriesRepository.create({
            name
        });

        return { category };
    }
}
