import { PrismaMuscleGroupsRepository } from "../../../repositories/prisma/prisma-muscle-groups.repository";
import { CreateMuscleGroupUseCase } from "../../muscle-groups/create-muscle-group.use-case";

export function makeCreateMuscleGroupUseCase() {
    return new CreateMuscleGroupUseCase(new PrismaMuscleGroupsRepository);
}
