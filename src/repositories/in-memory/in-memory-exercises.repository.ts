import { Exercise, Prisma } from "@prisma/client";
import { ExercisesRepository } from "../exercises.repository";
import { faker } from "@faker-js/faker";
import { ExerciseNotFound } from "../../use-cases/errors/exercise-not-found";

export class InMemoryExercisesRepository implements ExercisesRepository {
    public items: Exercise[] = [];

    async findById(id: string): Promise<Exercise | null> {
        const exercise = this.items.find(exercise => exercise.id == id);

        return exercise || null;
    }

    async findAll(): Promise<Exercise[] | null> {
        const exercises = this.items;

        return exercises;
    }

    async create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
        const exercise: Exercise = {
            id: faker.string.uuid(),
            name: data.name,
            description: data.description,
            categoryId: data.category.connect?.id || "",
            muscleGroupId: data.category.connect?.id || ""
        }

        this.items.push(exercise);

        return exercise;
    }

    async update(id: string, data: Prisma.ExerciseUpdateInput): Promise<Exercise> {
        const index = this.items.findIndex(exercise => exercise.id == id);

        if (index == -1) throw new ExerciseNotFound();

        const existingExercise = this.items[index];

        const updatedExercise: Exercise = {
            ...existingExercise,
            name: data.name as string ?? existingExercise.name,
            description: data.description as string ?? existingExercise.description,
            categoryId: data.category?.connect?.id as string ?? existingExercise.categoryId,
            muscleGroupId: data.muscleGroup?.connect?.id as string ?? existingExercise.muscleGroupId
        }

        this.items[index] = updatedExercise;

        return updatedExercise;
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex(exercise => exercise.id == id);

        if (index == -1) return;

        this.items.splice(index, 1);
    }
}
