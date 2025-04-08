import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/categories.repository";
import { CategoryNotFound } from "../errors/category-not-found.error";

interface FindCategoryUseCaseRequestParams {
    id: string
}

interface FindCategoryUseCaseReponse {
    category: Category
}

export class FindCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute({ id }: FindCategoryUseCaseRequestParams): Promise<FindCategoryUseCaseReponse> {
        const category = await this.categoriesRepository.findById(id);

        if (!category) throw new CategoryNotFound();

        return { category };
    }
}
