import { Exercise } from "@prisma/client"

export type ExerciseWithRelations = Exercise & {
    category: {
        id: string,
        name: string
    },
    muscleGroup: {
        id: string,
        name: string
    }
}
