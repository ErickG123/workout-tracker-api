import { PrismaMuscleGroupsRepository } from "../../../repositories/prisma/prisma-muscle-groups.repository";
import { FindAllMuscleGroupsUseCase } from "../../muscle-groups/find-all-muscle-groups.use-case";

export function makeFindAllMuscleGroupsUseCase() {
    return new FindAllMuscleGroupsUseCase(new PrismaMuscleGroupsRepository);
}
