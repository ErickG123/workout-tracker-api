import { FastifyTypedInstance } from "../../../@types/fastify-typed-instance";
import { createCategoryController } from "./create-category.controller";
import { findAllCategoriesController } from "./find-all-categories.controller";
import { findCategoryController } from "./find-category.controller";
import { updateCategoryController } from "./update-category.controller";
import { deleteCategoryController } from "./delete-category.controller";
import { createCategorySchema, deleteCategorySchema, findAllCategoriesSchema, findCategorySchema, updateCategorySchema } from "../../../docs/schemas/categories.schema";

export function categoriesRoutes(app: FastifyTypedInstance) {
    app.get("/categories", {
        preHandler: [app.authenticate],
        schema: findAllCategoriesSchema
    }, findAllCategoriesController);
    app.get("/categories/:id", {
        preHandler: [app.authenticate],
        schema: findCategorySchema
    }, findCategoryController);
    app.post("/categories", {
        preHandler: [app.authenticate],
        schema: createCategorySchema
    }, createCategoryController);
    app.put("/categories/:id", {
        preHandler: [app.authenticate],
        schema: updateCategorySchema
    }, updateCategoryController);
    app.delete("/categories/:id", {
        preHandler: [app.authenticate],
        schema: deleteCategorySchema
    }, deleteCategoryController);
}
