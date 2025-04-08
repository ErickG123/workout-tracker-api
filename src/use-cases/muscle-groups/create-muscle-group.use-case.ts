import { MuscleGroup } from "@prisma/client"
import { MuscleGroupsRepository } from "../../repositories/muscle-groups.repository"

interface CreateMuscleGroupUseCaseRequest {
    name: string
}

interface CreateMuscleGroupUseCaseResponse {
    muscleGroup: MuscleGroup
}

export class CreateMuscleGroupUseCase {
    constructor(private muscleGroupsRepository: MuscleGroupsRepository) { }

    async execute({ name }: CreateMuscleGroupUseCaseRequest): Promise<CreateMuscleGroupUseCaseResponse> {
        const muscleGroup = await this.muscleGroupsRepository.create({
            name
        });

        return { muscleGroup };
    }
}
