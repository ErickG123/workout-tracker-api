import { FastifyInstance } from "fastify";
import { findAllMuscleGroupsController } from "./find-all-muscle-groups.controller";
import { findMuscleGroupController } from "./find-muscle-group.controller";
import { createMuscleGroupController } from "./create-muscle-group.controller";
import { updateMuscleGroupController } from "./update-muscle-group.controller";
import { deleteMuscleGroupController } from "./delete-muscle-group.controller";

export function muscleGroupsRoutes(app: FastifyInstance) {
    app.get("/muscleGroups", findAllMuscleGroupsController);
    app.get("/muscleGroups/:id", findMuscleGroupController);
    app.post("/muscleGroups", createMuscleGroupController);
    app.put("/muscleGroups/:id", updateMuscleGroupController);
    app.delete("/muscleGroups/:id", deleteMuscleGroupController);
}
