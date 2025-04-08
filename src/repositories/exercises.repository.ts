import { Exercise, Prisma } from "@prisma/client";

export interface ExercisesRepository {
    findById(id: string): Promise<Exercise | null>
    findAll(): Promise<Exercise[] | null>
    create(data: Prisma.ExerciseCreateInput): Promise<Exercise>
    update(id: string, data: Prisma.ExerciseUpdateInput): Promise<Exercise>
    delete(id: string): Promise<void>
}
