import { FastifyInstance } from "fastify";
import { createCategoryController } from "./create-category.controller";
import { findAllCategoriesController } from "./find-all-categories.controller";
import { findCategoryController } from "./find-category.controller";
import { updateCategoryController } from "./update-category.controller";
import { deleteCategoryController } from "./delete-category.controller";

export function categoriesRoutes(app: FastifyInstance) {
    app.get("/categories", findAllCategoriesController);
    app.get("/categories/:id", findCategoryController);
    app.post("/categories", createCategoryController);
    app.put("/categories/:id", updateCategoryController);
    app.delete("/categories/:id", deleteCategoryController);
}
