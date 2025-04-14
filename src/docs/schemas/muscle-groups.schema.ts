import { z } from "zod"

export const findAllMuscleGroupsSchema = {
    description: "Return All Muscle Groups",
    tags: ["muscleGroups"],
    security: [{ cookieAuth: [] }]
}

export const findMuscleGroupSchema = {
    description: "Return a specific Muscle Group by ID",
    tags: ["muscleGroups"],
    params: z.object({
        id: z.string().uuid().describe("Muscle Group ID")
    }),
    response: {
        200: z.object({
            id: z.string().uuid(),
            name: z.string()
        }).describe("Muscle Group found"),
        404: z.null().describe("Muscle Group not found")
    },
    security: [{ cookieAuth: [] }]
}

export const createMuscleGroupSchema = {
    description: "Create a new Muscle Group",
    tags: ["muscleGroups"],
    body: z.object({
        name: z.string().describe("Muscle Group name")
    }),
    response: {
        201: z.object({
            id: z.string().uuid(),
            name: z.string()
        }).describe("Muscle Group created"),
        401: z.null().describe("Unauthorized")
    },
    security: [{ cookieAuth: [] }]
}

export const updateMuscleGroupSchema = {
    description: "Update an existing Muscle Group",
    tags: ["muscleGroups"],
    params: z.object({
        id: z.string().uuid().describe("Muscle Group ID")
    }),
    body: z.object({
        name: z.string().describe("Updated Muscle Group name")
    }),
    response: {
        200: z.object({
            id: z.string().uuid(),
            name: z.string()
        }).describe("Muscle Group updated"),
        404: z.null().describe("Muscle Group not found")
    },
    security: [{ cookieAuth: [] }]
}

export const deleteMuscleGroupSchema = {
    description: "Delete a Muscle Group",
    tags: ["muscleGroups"],
    params: z.object({
        id: z.string().uuid().describe("Muscle Group ID")
    }),
    response: {
        204: z.null().describe("Muscle Group deleted"),
        404: z.null().describe("Muscle Group not found")
    },
    security: [{ cookieAuth: [] }]
}
