import { z } from "zod";

export const findAllCategoriesSchema = {
    description: "Return All Categories",
    tags: ["categories"],
    security: [{ cookieAuth: [] }]
}

export const findCategorySchema = {
    description: "Return a specific Category by ID",
    tags: ["categories"],
    params: z.object({
        id: z.string().uuid().describe("Category ID")
    }),
    response: {
        200: z.object({
            id: z.string().uuid(),
            name: z.string()
        }).describe("Category found"),
        404: z.null().describe("Category not found")
    },
    security: [{ cookieAuth: [] }]
}

export const createCategorySchema = {
    description: "Create a new Category",
    tags: ["categories"],
    body: z.object({
        name: z.string().describe("Category name")
    }),
    response: {
        201: z.object({
            id: z.string().uuid(),
            name: z.string()
        }).describe("Category created"),
        401: z.null().describe("Unauthorized")
    },
    security: [{ cookieAuth: [] }]
}

export const updateCategorySchema = {
    description: "Update an existing Category",
    tags: ["categories"],
    params: z.object({
        id: z.string().uuid().describe("Category ID")
    }),
    body: z.object({
        name: z.string().describe("Updated category name")
    }),
    response: {
        200: z.object({
            id: z.string().uuid(),
            name: z.string()
        }).describe("Category updated"),
        404: z.null().describe("Category not found")
    },
    security: [{ cookieAuth: [] }]
}

export const deleteCategorySchema = {
    description: "Delete a Category",
    tags: ["categories"],
    params: z.object({
        id: z.string().uuid().describe("Category ID")
    }),
    response: {
        204: z.null().describe("Category deleted"),
        404: z.null().describe("Category not found")
    },
    security: [{ cookieAuth: [] }]
}
