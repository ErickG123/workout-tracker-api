import { ExercisesRepository } from "../../repositories/exercises.repository";
import { ExerciseNotFound } from "../errors/exercise-not-found";

interface DeleteExerciseUseCaseRequestParams {
    id: string
}

export class DeleteExerciseUseCase {
    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute({ id }: DeleteExerciseUseCaseRequestParams): Promise<void> {
        const exerciseExists = await this.exercisesRepository.findById(id);

        if (!exerciseExists) throw new ExerciseNotFound();

        await this.exercisesRepository.delete(id);
    }
}
