import { MuscleGroup, Prisma } from "@prisma/client";
import { MuscleGroupsRepository } from "../muscle-groups.repository";
import { randomUUID } from "crypto";
import { MuscleGroupNotFound } from "../../use-cases/errors/muscle-group-not-found.error";

export class InMemoryMuscleGroupsRepository implements MuscleGroupsRepository {
    public items: MuscleGroup[] = [];

    async findById(id: string): Promise<MuscleGroup | null> {
        const muscleGroup = this.items.find(muscleGroup => muscleGroup.id == id);

        return muscleGroup || null;
    }

    async findAll(): Promise<MuscleGroup[] | null> {
        const muscleGroups = this.items;

        return muscleGroups;
    }

    async create(data: Prisma.MuscleGroupCreateInput): Promise<MuscleGroup> {
        const muscleGroup: MuscleGroup = {
            id: randomUUID(),
            name: data.name
        }

        this.items.push(muscleGroup);

        return muscleGroup;
    }

    async update(id: string, data: Prisma.MuscleGroupUpdateInput): Promise<MuscleGroup> {
        const index = this.items.findIndex(muscleGroup => muscleGroup.id == id);

        if (index == -1) throw new MuscleGroupNotFound();

        const existingMuscleGroup = this.items[index];

        const updatedMuscleGroup: MuscleGroup = {
            ...existingMuscleGroup,
            name: data.name as string ?? existingMuscleGroup.name
        }

        this.items[index] = updatedMuscleGroup;

        return updatedMuscleGroup;
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex(item => item.id == id);

        if (index == -1) return;

        this.items.splice(index, 1);
    }
}
