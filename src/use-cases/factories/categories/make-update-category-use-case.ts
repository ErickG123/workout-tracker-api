import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories.repository";
import { UpdateCategoryUseCase } from "../../categories/update-category.use-case";

export function makeUpdateCategoryUseCase() {
    return new UpdateCategoryUseCase(new PrismaCategoriesRepository);
}
