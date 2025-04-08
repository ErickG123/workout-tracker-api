import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/categories.repository";

interface CreateCategoryUseCaseRequest {
    name: string
}

interface CreateCategoryUseCaseResponse {
    category: Category
}

export class CreateCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute({ name }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
        const category = await this.categoriesRepository.create({
            name
        });

        return { category };
    }
}
