import { Exercise, Prisma } from "@prisma/client";
import { ExercisesRepository } from "../exercises.repository";
import { prisma } from "../../lib/prisma";

export class PrismaExercisesRepositry implements ExercisesRepository {
    async findById(id: string): Promise<Exercise | null> {
        try {
            const exercise = await prisma.exercise.findUnique({
                where: {
                    id
                }
            });

            return exercise;
        } catch (error) {
            console.error("Error Fetching Exercise: ", error);
            throw error;
        }
    }

    async findAll(): Promise<Exercise[] | null> {
        try {
            const exercises = await prisma.exercise.findMany();

            return exercises;
        } catch (error) {
            console.error("Error Fetching All Exercises: ", error);
            throw error;
        }
    }

    async create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
        try {
            const exercise = await prisma.exercise.create({
                data
            });

            return exercise;
        } catch (error) {
            console.error("Error Creating Exercise: ", error);
            throw error;
        }
    }

    async update(id: string, data: Prisma.ExerciseUpdateInput): Promise<Exercise> {
        try {
            const exercise = await prisma.exercise.update({
                where: {
                    id
                },
                data
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
