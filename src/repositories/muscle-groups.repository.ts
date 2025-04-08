import { MuscleGroup, Prisma } from "@prisma/client"

export interface MuscleGroupsRepository {
    findById(id: string): Promise<MuscleGroup | null>
    findAll(): Promise<MuscleGroup[] | null>
    create(data: Prisma.MuscleGroupCreateInput): Promise<MuscleGroup>
    update(id: string, data: Prisma.MuscleGroupUpdateInput): Promise<MuscleGroup>
    delete(id: string): Promise<void>
}
