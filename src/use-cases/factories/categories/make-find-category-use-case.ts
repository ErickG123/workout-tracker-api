import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories.repository";
import { FindCategoryUseCase } from "../../categories/find-category.use-case";

export function makeFindCategoryUseCase() {
    return new FindCategoryUseCase(new PrismaCategoriesRepository);
}
