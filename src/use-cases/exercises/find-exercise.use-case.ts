import { ExercisesRepository } from "../../repositories/exercises.repository";
import { ExerciseNotFound } from "../errors/exercise-not-found";
import { ExerciseWithRelations } from "../../@types/exercises";

interface FindExerciseUseCaseResquestParams {
    id: string
}

interface FindExerciseUseCaseResponse {
    exercise: ExerciseWithRelations
}

export class FindExerciseUseCase {
    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute({ id }: FindExerciseUseCaseResquestParams): Promise<FindExerciseUseCaseResponse> {
        const exercise = await this.exercisesRepository.findById(id);

        if (!exercise) throw new ExerciseNotFound();

        return { exercise };
    }
}
