import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories.repository";
import { FindAllCategoriesUseCase } from "../../categories/find-all-categories.use-case";

export function makeFindAllCategoriesUseCase() {
    return new FindAllCategoriesUseCase(new PrismaCategoriesRepository);
}
