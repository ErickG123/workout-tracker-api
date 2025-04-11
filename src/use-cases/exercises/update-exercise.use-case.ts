import { Exercise } from "@prisma/client"
import { ExercisesRepository } from "../../repositories/exercises.repository"
import { ExerciseNotFound } from "../errors/exercise-not-found"
import { validateNonEmptyString } from "../../lib/validators/validate-non-empty-string"

interface UpdateExerciseUseCaseRequestParams {
    id: string
}

interface UpdateExerciseUseCaseRequest {
    name: string
    description: string
    categoryId: string
    muscleGroupId: string
}

interface UpdateExerciseUseCaseResponse {
    exercise: Exercise
}

export class UpdateExerciseUseCase {
    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute(
        { id }: UpdateExerciseUseCaseRequestParams,
        { name, description, categoryId, muscleGroupId }: UpdateExerciseUseCaseRequest
    ): Promise<UpdateExerciseUseCaseResponse> {
        validateNonEmptyString(name, "Exercise Name");
        validateNonEmptyString(description, "Exercise Description");
        validateNonEmptyString(categoryId, "Category ID");
        validateNonEmptyString(muscleGroupId, "Muscle Group ID");

        const exerciseExists = await this.exercisesRepository.findById(id);

        if (!exerciseExists) throw new ExerciseNotFound();

        const exercise = await this.exercisesRepository.update(
            id,
            {
                name,
                description,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                muscleGroup: {
                    connect: {
                        id: muscleGroupId
                    }
                }
            }
        );

        return { exercise };
    }
}
