import { MuscleGroupsRepository } from "../../repositories/muscle-groups.repository";
import { MuscleGroupNotFound } from "../errors/muscle-group-not-found.error";

interface DeleteMuscleGroupUseCaseRequestParams {
    id: string
}

export class DeleteMuscleGroupUseCase {
    constructor(private muscleGroupsRepository: MuscleGroupsRepository) { }

    async execute({ id }: DeleteMuscleGroupUseCaseRequestParams): Promise<void> {
        const muscleGroupExists = await this.muscleGroupsRepository.findById(id);

        if (!muscleGroupExists) throw new MuscleGroupNotFound();

        await this.muscleGroupsRepository.delete(id);
    }
}
