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

describe("Update Exercise Use Case", () => {
    it("should update exercise", async () => {

    });

    it("should throw error if exercise not found", async () => {

    });

    it("should throw error if name is empty string", async () => {

    });

    it("should throw error if description is empty string", async () => {

    });

    it("should throw error if category id is empty string", async () => {

    });

    it("should throw error if muscle group id is empty string", async () => {

    });
});
