import { Exercise } from "@prisma/client";
import { ExercisesRepository } from "../../repositories/exercises.repository";

interface FindAllExercisesUseCaseResponse {
    exercises: Exercise[]
}

export class FindAllExercisesUseCase {
    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute(): Promise<FindAllExercisesUseCaseResponse> {
        const exercises = await this.exercisesRepository.findAll();

        return { exercises: exercises ?? [] }
    }
}
