import { CategoriesRepository } from "../../repositories/categories.repository";
import { CategoryNotFound } from "../errors/category-not-found.error";

interface DeleteCategoryUseCaseRequest {
    id: string
}

export class DeleteCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute({ id }: DeleteCategoryUseCaseRequest): Promise<void> {
        const categoryExists = await this.categoriesRepository.findById(id);

        if (!categoryExists) throw new CategoryNotFound();

        await this.categoriesRepository.delete(id);
    }
}
