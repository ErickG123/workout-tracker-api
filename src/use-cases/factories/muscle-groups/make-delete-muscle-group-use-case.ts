import { PrismaMuscleGroupsRepository } from "../../../repositories/prisma/prisma-muscle-groups.repository";
import { DeleteMuscleGroupUseCase } from "../../muscle-groups/delete-muscle-group.use-case";

export function makeDeleteMuscleGroupUseCase() {
    return new DeleteMuscleGroupUseCase(new PrismaMuscleGroupsRepository);
}
