import { MuscleGroup, Prisma } from "@prisma/client";
import { MuscleGroupsRepository } from "../muscle-groups.repository";
import { prisma } from "../../lib/prisma";

export class PrismaMuscleGroupsRepository implements MuscleGroupsRepository {
    async findById(id: string): Promise<MuscleGroup | null> {
        try {
            const muscleGroup = await prisma.muscleGroup.findUnique({
                where: {
                    id
                }
            });

            return muscleGroup;
        } catch (error) {
            console.error("Error Fetching Muscle Group");
            throw error;
        }
    }

    async findAll(): Promise<MuscleGroup[] | null> {
        try {
            const muscleGroups = await prisma.muscleGroup.findMany();

            return muscleGroups;
        } catch (error) {
            console.error("Error Fetching All Muscle Groups");
            throw error;
        }
    }

    async create(data: Prisma.MuscleGroupCreateInput): Promise<MuscleGroup> {
        try {
            const muscleGroup = await prisma.muscleGroup.create({
                data
            });

            return muscleGroup;
        } catch (error) {
            console.error("Error Creating Muscle Group");
            throw error;
        }
    }

    async update(id: string, data: Prisma.MuscleGroupUpdateInput): Promise<MuscleGroup> {
        try {
            const muscleGroup = await prisma.muscleGroup.update({
                where: {
                    id
                },
                data
            });

            return muscleGroup;
        } catch (error) {
            console.error("Error Updating Muscle Group");
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.muscleGroup.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error("Error Deleting Muscle Group");
            throw error;
        }
    }
}
