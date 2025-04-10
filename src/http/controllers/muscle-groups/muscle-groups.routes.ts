import { FastifyInstance } from "fastify";
import { findAllMuscleGroupsController } from "./find-all-muscle-groups.controller";
import { findMuscleGroupController } from "./find-muscle-group.controller";
import { createMuscleGroupController } from "./create-muscle-group.controller";
import { updateMuscleGroupController } from "./update-muscle-group.controller";
import { deleteMuscleGroupController } from "./delete-muscle-group.controller";

export function muscleGroupsRoutes(app: FastifyInstance) {
    app.get("/muscleGroups", { preHandler: [app.authenticate] }, findAllMuscleGroupsController);
    app.get("/muscleGroups/:id", { preHandler: [app.authenticate] }, findMuscleGroupController);
    app.post("/muscleGroups", { preHandler: [app.authenticate] }, createMuscleGroupController);
    app.put("/muscleGroups/:id", { preHandler: [app.authenticate] }, updateMuscleGroupController);
    app.delete("/muscleGroups/:id", { preHandler: [app.authenticate] }, deleteMuscleGroupController);
}
