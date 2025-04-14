import { z } from "zod";

export const findAllUsersSchema = {
    description: "Find All Users",
    tags: ["users"]
}

export const findUserSchema = {
    description: "Return a specific User by ID",
    tags: ["users"],
    params: z.object({
        id: z.string().uuid().describe("User ID")
    }),
    response: {
        200: z.object({
            id: z.string().uuid(),
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            createdAt: z.date()
        }).describe("User found"),
        404: z.null().describe("User not found")
    }
}

export const refreshTokenUserSchema = {
    description: "Return User Refresh Token",
    tags: ["users"],
    response: {
        201: z.object({
            token: z.string()
        })
    }
}

export const createUserSchema = {
    description: "Create a new User",
    tags: ["users"],
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    }),
    response: {
        201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            createdAt: z.date()
        }).describe("User created"),
        400: z.null().describe("Error creating User")
    }
}

export const authenticateUserSchema = {
    description: "Authenticate User",
    tags: ["users"],
    body: z.object({
        email: z.string().email().describe("User e-mail"),
        password: z.string().describe("User password")
    }),
    response: {
        201: z.object({
            token: z.string()
        }).describe("User authenticated"),
        400: z.null().describe("Invalid credentials")
    }
}

export const updateUserSchema = {
    description: "Create a new User",
    tags: ["users"],
    params: z.object({
        id: z.string().uuid()
    }),
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    }),
    response: {
        201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            createdAt: z.date()
        }).describe("User created"),
        400: z.null().describe("Error updating User")
    },
    security: [{ cookieAuth: [] }]
}

export const deleteUserSchema = {
    description: "Update a User",
    tags: ["users"],
    params: z.object({
        id: z.string().uuid()
    }),
    reponse: {
        204: z.null().describe("User deleted"),
        400: z.null().describe("Error deleting User"),
        404: z.null().describe("User not found")
    },
    security: [{ cookieAuth: [] }]
}
