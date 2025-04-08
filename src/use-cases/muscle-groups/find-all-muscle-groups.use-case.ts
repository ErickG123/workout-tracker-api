import { MuscleGroup } from "@prisma/client";
import { MuscleGroupsRepository } from "../../repositories/muscle-groups.repository";

interface FindAllMuscleGroupsUseCaseResponse {
    muscleGroups: MuscleGroup[]
}

export class FindAllMuscleGroupsUseCase {
    constructor(private muscleGroupsRepository: MuscleGroupsRepository) { }

    async execute(): Promise<FindAllMuscleGroupsUseCaseResponse> {
        const muscleGroups = await this.muscleGroupsRepository.findAll();

        return { muscleGroups: muscleGroups ?? [] };
    }
}
