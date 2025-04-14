import { FastifyTypedInstance } from "../../../@types/fastify-typed-instance";
import { findAllMuscleGroupsController } from "./find-all-muscle-groups.controller";
import { findMuscleGroupController } from "./find-muscle-group.controller";
import { createMuscleGroupController } from "./create-muscle-group.controller";
import { updateMuscleGroupController } from "./update-muscle-group.controller";
import { deleteMuscleGroupController } from "./delete-muscle-group.controller";
import { createMuscleGroupSchema, deleteMuscleGroupSchema, findAllMuscleGroupsSchema, findMuscleGroupSchema, updateMuscleGroupSchema } from "../../../docs/schemas/muscle-groups.schema";

export function muscleGroupsRoutes(app: FastifyTypedInstance) {
    app.get("/muscleGroups", {
        preHandler: [app.authenticate],
        schema: findAllMuscleGroupsSchema
    }, findAllMuscleGroupsController);
    app.get("/muscleGroups/:id", {
        preHandler: [app.authenticate],
        schema: findMuscleGroupSchema
    }, findMuscleGroupController);
    app.post("/muscleGroups", {
        preHandler: [app.authenticate],
        schema: createMuscleGroupSchema
    }, createMuscleGroupController);
    app.put("/muscleGroups/:id", {
        preHandler: [app.authenticate],
        schema: updateMuscleGroupSchema
    }, updateMuscleGroupController);
    app.delete("/muscleGroups/:id", {
        preHandler: [app.authenticate],
        schema: deleteMuscleGroupSchema
    }, deleteMuscleGroupController);
}
