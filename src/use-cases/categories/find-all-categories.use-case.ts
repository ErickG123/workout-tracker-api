import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/categories.repository";

interface FindAllCategoriesUseCaseResponse {
    categories: Category[]
}

export class FindAllCategoriesUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute(): Promise<FindAllCategoriesUseCaseResponse> {
        const categories = await this.categoriesRepository.findAll();

        return { categories: categories ?? [] };
    }
}
