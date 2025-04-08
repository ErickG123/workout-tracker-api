import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories.repository";
import { DeleteCategoryUseCase } from "../../categories/delete-category.use-case";

export function makeDeleteCategoryUseCase() {
    return new DeleteCategoryUseCase(new PrismaCategoriesRepository);
}
