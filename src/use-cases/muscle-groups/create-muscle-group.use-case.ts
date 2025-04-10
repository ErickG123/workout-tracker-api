import { MuscleGroup } from "@prisma/client"
import { MuscleGroupsRepository } from "../../repositories/muscle-groups.repository"
import { validateNonEmptyString } from "../../lib/validators/validate-non-empty-string"

interface CreateMuscleGroupUseCaseRequest {
    name: string
}

interface CreateMuscleGroupUseCaseResponse {
    muscleGroup: MuscleGroup
}

export class CreateMuscleGroupUseCase {
    constructor(private muscleGroupsRepository: MuscleGroupsRepository) { }

    async execute({ name }: CreateMuscleGroupUseCaseRequest): Promise<CreateMuscleGroupUseCaseResponse> {
        validateNonEmptyString(name, "Muscle group name");

        const muscleGroup = await this.muscleGroupsRepository.create({
            name
        });

        return { muscleGroup };
    }
}
