import { MuscleGroup } from "@prisma/client"
import { MuscleGroupsRepository } from "../../repositories/muscle-groups.repository"
import { MuscleGroupNotFound } from "../errors/muscle-group-not-found.error";

interface FindMuscleGroupUseCaseRequestParams {
    id: string
}

interface FindMuscleGroupUseCaseResponse {
    muscleGroup: MuscleGroup
}

export class FindMuscleGroupUseCase {
    constructor(private muscleGroupsRepository: MuscleGroupsRepository) { }

    async execute({ id }: FindMuscleGroupUseCaseRequestParams): Promise<FindMuscleGroupUseCaseResponse> {
        const muscleGroup = await this.muscleGroupsRepository.findById(id);

        if (!muscleGroup) throw new MuscleGroupNotFound();

        return { muscleGroup };
    }
}
