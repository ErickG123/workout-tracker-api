import { Exercise } from "@prisma/client";
import { ExercisesRepository } from "../../repositories/exercises.repository";
import { ExerciseNotFound } from "../errors/exercise-not-found";

interface FindExerciseUseCaseResquestParams {
    id: string
}

interface FindExerciseUseCaseResponse {
    exercise: Exercise
}

export class FindExerciseUseCase {
    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute({ id }: FindExerciseUseCaseResquestParams): Promise<FindExerciseUseCaseResponse> {
        const exercise = await this.exercisesRepository.findById(id);

        if (!exercise) throw new ExerciseNotFound();

        return { exercise };
    }
}
