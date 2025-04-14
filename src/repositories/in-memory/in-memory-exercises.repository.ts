import { Exercise, Prisma } from "@prisma/client";
import { ExercisesRepository } from "../exercises.repository";
import { faker } from "@faker-js/faker";
import { ExerciseNotFound } from "../../use-cases/errors/exercise-not-found";
import { ExerciseWithRelations } from "../../@types/exercises";

export class InMemoryExercisesRepository implements ExercisesRepository {
    public items: Exercise[] = [];

    async findById(id: string): Promise<ExerciseWithRelations | null> {
        const exercise = this.items.find(exercise => exercise.id === id);

        if (exercise) {
            return {
                ...exercise,
                category: { id: exercise.categoryId, name: "Category Example" },
                muscleGroup: { id: exercise.muscleGroupId, name: "Muscle Group Example" }

            };
        }

        return null;
    }

    async findAll(): Promise<ExerciseWithRelations[] | null> {
        return this.items.map(exercise => ({
            ...exercise,
            category: { id: exercise.categoryId, name: "Category Example" },
            muscleGroup: { id: exercise.muscleGroupId, name: "Muscle Group Example" }
        }));
    }

    async create(data: Prisma.ExerciseCreateInput): Promise<ExerciseWithRelations> {
        const exercise: Exercise = {
            id: faker.string.uuid(),
            name: data.name,
            description: data.description,
            categoryId: data.category?.connect?.id || "",
            muscleGroupId: data.muscleGroup?.connect?.id || ""
        };

        this.items.push(exercise);

        return {
            ...exercise,
            category: { id: exercise.categoryId, name: "Category Example" },
            muscleGroup: { id: exercise.muscleGroupId, name: "Muscle Group Example" }
        };
    }

    async update(id: string, data: Prisma.ExerciseUpdateInput): Promise<ExerciseWithRelations> {
        const index = this.items.findIndex(exercise => exercise.id === id);

        if (index === -1) {
            throw new ExerciseNotFound();
        }

        const existingExercise = this.items[index];

        const updatedExercise: Exercise = {
            ...existingExercise,
            name: data.name as string ?? existingExercise.name,
            description: data.description as string ?? existingExercise.description,
            categoryId: data.category?.connect?.id ?? existingExercise.categoryId,
            muscleGroupId: data.muscleGroup?.connect?.id ?? existingExercise.muscleGroupId,
        };

        this.items[index] = updatedExercise;

        return {
            ...updatedExercise,
            category: { id: updatedExercise.categoryId, name: "Updated Category Example" },
            muscleGroup: { id: updatedExercise.muscleGroupId, name: "Updated Muscle Group Example" }
        };
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex(exercise => exercise.id === id);

        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
}
