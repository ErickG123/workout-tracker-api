import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/categories.repository"
import { CategoryNotFound } from "../errors/category-not-found.error";
import { validateNonEmptyString } from "../../lib/validators/validate-non-empty-string";

interface UpdateCategoryUseCaseRequestParams {
    id: string
}

interface UpdateCategoryUseCaseRequest {
    name: string
}

interface UpdateCategoryUseCaseResponse {
    category: Category
}

export class UpdateCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute(
        { id }: UpdateCategoryUseCaseRequestParams,
        { name }: UpdateCategoryUseCaseRequest
    ): Promise<UpdateCategoryUseCaseResponse> {
        validateNonEmptyString(name, "Category name");

        const categoryExists = await this.categoriesRepository.findById(id);

        if (!categoryExists) throw new CategoryNotFound();

        const category = await this.categoriesRepository.update(
            id,
            {
                name
            }
        );

        return { category };
    }
}
