import { PrismaMuscleGroupsRepository } from "../../../repositories/prisma/prisma-muscle-groups.repository";
import { UpdateMuscleGroupUseCase } from "../../muscle-groups/update-muscle-group.use-case";

export function makeUpdateMuscleGroupUseCase() {
    return new UpdateMuscleGroupUseCase(new PrismaMuscleGroupsRepository);
}
