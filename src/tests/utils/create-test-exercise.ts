import { faker } from "@faker-js/faker";
import { CreateExerciseUseCase } from "../../use-cases/exercises/create-exercise.use-case";
import { createTestCategory } from "./create-test.category";
import { CreateCategoryUseCase } from "../../use-cases/categories/create-category.use-case";
import { CreateMuscleGroupUseCase } from "../../use-cases/muscle-groups/create-muscle-group.use-case";
import { createTestMuscleGroup } from "./create-test-muscle-group";

export async function createTestExercise(
    createExerciseUseCase: CreateExerciseUseCase,
    createCategoryUseCase: CreateCategoryUseCase,
    createMuscleGroupUseCase: CreateMuscleGroupUseCase
) {
    const name = faker.word.words();
    const description = faker.lorem.lines();

    const { category } = await createTestCategory(createCategoryUseCase);
    const { muscleGroup } = await createTestMuscleGroup(createMuscleGroupUseCase);

    const exercise = await createExerciseUseCase.execute({
        name,
        description,
        categoryId: category.id,
        muscleGroupId: muscleGroup.id
    });

    return exercise;
}
