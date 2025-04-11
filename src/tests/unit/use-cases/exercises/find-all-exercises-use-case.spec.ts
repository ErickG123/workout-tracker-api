import { beforeEach, describe, it } from "vitest";
import { InMemoryExercisesRepository } from "../../../../repositories/in-memory/in-memory-exercises.repository";
import { CreateCategoryUseCase } from "../../../../use-cases/categories/create-category.use-case";
import { CreateMuscleGroupUseCase } from "../../../../use-cases/muscle-groups/create-muscle-group.use-case";
import { CreateExerciseUseCase } from "../../../../use-cases/exercises/create-exercise.use-case";

let exercisesRepository: InMemoryExercisesRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let createMuscleGroupUseCase: CreateMuscleGroupUseCase;
let createExerciseUseCase: CreateExerciseUseCase;

beforeEach(() => {
    exercisesRepository = new InMemoryExercisesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(exercisesRepository);
    createMuscleGroupUseCase = new CreateMuscleGroupUseCase(exercisesRepository);
    createExerciseUseCase = new CreateExerciseUseCase(exercisesRepository);
});

describe("Find All Exercises Use Case", () => {
    it("should return all exercises", async () => {

    });

    it("should return an empty array if no categories exist", async () => {
        
    });
});
