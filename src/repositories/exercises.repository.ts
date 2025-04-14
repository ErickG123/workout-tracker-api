import { Prisma } from "@prisma/client";
import { ExerciseWithRelations } from "../@types/exercises";

export interface ExercisesRepository {
    findById(id: string): Promise<ExerciseWithRelations | null>
    findAll(): Promise<ExerciseWithRelations[] | null>
    create(data: Prisma.ExerciseCreateInput): Promise<ExerciseWithRelations>
    update(id: string, data: Prisma.ExerciseUpdateInput): Promise<ExerciseWithRelations>
    delete(id: string): Promise<void>
}
