import { z } from "zod"

export const findAllExercisesSchema = {
    description: "Return All Exercises",
    tags: ["exercises"],
    security: [{ cookieAuth: [] }]
}

export const findExerciseSchema = {
    description: "Return a specific Exercise by ID",
    tags: ["exercises"],
    params: z.object({
        id: z.string().uuid().describe("Exercise ID")
    }),
    response: {
        200: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            categoryId: z.string().uuid(),
            muscleGroupId: z.string().uuid(),
            category: z.object({
                id: z.string().uuid(),
                name: z.string()
            }),
            muscleGroup: z.object({
                id: z.string().uuid(),
                name: z.string()
            })
        }).describe("Exercise found"),
        401: z.null().describe("Unauthorized"),
        404: z.null().describe("Exercise not found")
    },
    security: [{ cookieAuth: [] }]
}

export const createExerciseSchema = {
    description: "Create a new Exercise",
    tags: ["exercises"],
    body: z.object({
        name: z.string().describe("Exercise name"),
        description: z.string(),
        categoryId: z.string().uuid(),
        muscleGroupId: z.string().uuid()
    }),
    response: {
        201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            categoryId: z.string().uuid(),
            muscleGroupId: z.string().uuid(),
            category: z.object({
                id: z.string().uuid(),
                name: z.string()
            }),
            muscleGroup: z.object({
                id: z.string().uuid(),
                name: z.string()
            })
        }).describe("Exercise created"),
        401: z.null().describe("Unauthorized")
    },
    security: [{ cookieAuth: [] }]
}

export const updateExerciseSchema = {
    description: "Update an existing Exercise",
    tags: ["exercises"],
    params: z.object({
        id: z.string().uuid().describe("Exercise ID")
    }),
    body: z.object({
        name: z.string().describe("Updated Exercise name"),
        description: z.string(),
        categoryId: z.string().uuid(),
        muscleGroupId: z.string().uuid()
    }),
    response: {
        200: z.object({
            id: z.string().uuid(),
            name: z.string(),
            category: z.object({
                id: z.string().uuid(),
                name: z.string()
            }),
            muscleGroup: z.object({
                id: z.string().uuid(),
                name: z.string()
            })
        }).describe("Exercise updated"),
        401: z.null().describe("Unauthorized"),
        404: z.null().describe("Exercise not found")
    },
    security: [{ cookieAuth: [] }]
}

export const deleteExerciseSchema = {
    description: "Delete a Exercise",
    tags: ["exercises"],
    params: z.object({
        id: z.string().uuid().describe("Exercise ID")
    }),
    response: {
        204: z.null().describe("Exercise deleted"),
        401: z.null().describe("Unauthorized"),
        404: z.null().describe("Exercise not found")
    },
    security: [{ cookieAuth: [] }]
}
