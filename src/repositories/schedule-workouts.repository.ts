import { Prisma, ScheduledWorkout } from "@prisma/client"

export interface ScheduleWorkoutsRepository {
    findById(id: string): Promise<ScheduledWorkout | null>
    findAll(): Promise<ScheduledWorkout[] | null>
    create(data: Prisma.ScheduledWorkoutCreateInput): Promise<ScheduledWorkout>
    update(id: string, data: Prisma.ScheduledWorkoutUpdateInput): Promise<ScheduledWorkout>
    delete(id: string): Promise<void>
}
