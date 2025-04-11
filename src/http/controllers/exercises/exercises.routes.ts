import { FastifyInstance } from "fastify";
import { findAllExercisesController } from "./find-all-exercises.controller";
import { findExerciseController } from "./find-exercise.controller";
import { createExerciseController } from "./create-exercise.controller";
import { updateExerciseController } from "./update-exercise.controller";
import { deleteExerciseController } from "./delete-exercise.controller";

export function exercisesRoutes(app: FastifyInstance) {
    app.get("/exercises", { preHandler: [app.authenticate] }, findAllExercisesController);
    app.get("/exercises/:id", { preHandler: [app.authenticate] }, findExerciseController);
    app.post("/exercises", { preHandler: [app.authenticate] }, createExerciseController);
    app.put("/exercises/:id", { preHandler: [app.authenticate] }, updateExerciseController);
    app.delete("/exercises/:id", { preHandler: [app.authenticate] }, deleteExerciseController);
}
