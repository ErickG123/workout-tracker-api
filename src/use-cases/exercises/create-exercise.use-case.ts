import { Exercise } from "@prisma/client";
import { ExercisesRepository } from "../../repositories/exercises.repository";
import { validateNonEmptyString } from "../../lib/validators/validate-non-empty-string";

interface CreateExerciseUseCaseRequest {
    name: string
    description: string
    categoryId: string
    muscleGroupId: string
}

interface CreateExerciseUseCaseResponse {
    exercise: Exercise
}

export class CreateExerciseUseCase {
    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute({
        name, description, categoryId, muscleGroupId
    }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {
        validateNonEmptyString(name, "Exercise Name");
        validateNonEmptyString(description, "Exercise Description");
        validateNonEmptyString(categoryId, "Category ID");
        validateNonEmptyString(muscleGroupId, "Muscle Group ID");

        const exercise = await this.exercisesRepository.create({
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
        });

        return { exercise };
    }
}
