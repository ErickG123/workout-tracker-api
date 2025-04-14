import { Prisma } from "@prisma/client";
import { ExercisesRepository } from "../exercises.repository";
import { prisma } from "../../lib/prisma";
import { ExerciseWithRelations } from "../../@types/exercises";

export class PrismaExercisesRepositry implements ExercisesRepository {
    async findById(id: string): Promise<ExerciseWithRelations | null> {
        try {
            const exercise = await prisma.exercise.findUnique({
                where: {
                    id
                },
                include: {
                    category:  true,
                    muscleGroup: true,
                    workoutPlanExercises: true
                }
            });

            return exercise;
        } catch (error) {
            console.error("Error Fetching Exercise: ", error);
            throw error;
        }
    }

    async findAll(): Promise<ExerciseWithRelations[] | null> {
        try {
            const exercises = await prisma.exercise.findMany({
                include: {
                    category:  true,
                    muscleGroup: true,
                    workoutPlanExercises: true
                }
            });

            return exercises;
        } catch (error) {
            console.error("Error Fetching All Exercises: ", error);
            throw error;
        }
    }

    async create(data: Prisma.ExerciseCreateInput): Promise<ExerciseWithRelations> {
        try {
            const exercise = await prisma.exercise.create({
                data,
                include: {
                    category:  true,
                    muscleGroup: true,
                    workoutPlanExercises: true
                }
            });

            return exercise;
        } catch (error) {
            console.error("Error Creating Exercise: ", error);
            throw error;
        }
    }

    async update(id: string, data: Prisma.ExerciseUpdateInput): Promise<ExerciseWithRelations> {
        try {
            const exercise = await prisma.exercise.update({
                where: {
                    id
                },
                data,
                include: {
                    category:  true,
                    muscleGroup: true,
                    workoutPlanExercises: true
                }
            });

            return exercise;
        } catch (error) {
            console.error("Error Updating Exercise: ", error);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.exercise.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error("Error Deleting Exercise: ", error);
            throw error;
        }
    }
}
