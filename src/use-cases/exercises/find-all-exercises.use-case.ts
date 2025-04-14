import { ExercisesRepository } from "../../repositories/exercises.repository";
import { ExerciseWithRelations } from "../../@types/exercises";

interface FindAllExercisesUseCaseResponse {
    exercises: ExerciseWithRelations[]
}

export class FindAllExercisesUseCase {
    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute(): Promise<FindAllExercisesUseCaseResponse> {
        const exercises = await this.exercisesRepository.findAll();

        return { exercises: exercises ?? [] }
    }
}
