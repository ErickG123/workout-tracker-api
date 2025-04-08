import { MuscleGroup } from "@prisma/client"
import { MuscleGroupsRepository } from "../../repositories/muscle-groups.repository"
import { MuscleGroupNotFound } from "../errors/muscle-group-not-found.error"

interface UpdateMuscleGroupUseCaseRequestParams {
    id: string
}

interface UpdateMuscleGroupUseCaseRequest {
    name: string
}

interface UpdateMuscleGroupUseCaseResponse {
    muscleGroup: MuscleGroup
}

export class UpdateMuscleGroupUseCase {
    constructor(private muscleGroupsRepository: MuscleGroupsRepository) { }

    async execute(
        { id }: UpdateMuscleGroupUseCaseRequestParams,
        { name }: UpdateMuscleGroupUseCaseRequest
    ): Promise<UpdateMuscleGroupUseCaseResponse> {
        const muscleGroupExists = await this.muscleGroupsRepository.findById(id);

        if (!muscleGroupExists) throw new MuscleGroupNotFound();

        const muscleGroup = await this.muscleGroupsRepository.update(
            id,
            {
                name
            }
        );

        return { muscleGroup };
    }
}
