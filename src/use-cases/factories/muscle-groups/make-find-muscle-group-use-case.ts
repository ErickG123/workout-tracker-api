import { PrismaMuscleGroupsRepository } from "../../../repositories/prisma/prisma-muscle-groups.repository";
import { FindMuscleGroupUseCase } from "../../muscle-groups/find-muscle-group.use-case";

export function makeFindMuscleGroupUseCase() {
    return new FindMuscleGroupUseCase(new PrismaMuscleGroupsRepository);
}
