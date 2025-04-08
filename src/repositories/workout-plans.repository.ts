import { Prisma, WorkoutPlan } from "@prisma/client"

export interface WorkoutPlansRepository {
    findById(id: string): Promise<WorkoutPlan | null>
    findAll(): Promise<WorkoutPlan[] | null>
    create(data: Prisma.WorkoutPlanCreateInput): Promise<WorkoutPlan>
    update(id: string, data: Prisma.WorkoutPlanUpdateInput): Promise<WorkoutPlan>
    delete(id: string): Promise<void>
}
