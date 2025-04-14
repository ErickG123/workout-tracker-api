import { FastifyTypedInstance } from "../../../@types/fastify-typed-instance";
import { findAllExercisesController } from "./find-all-exercises.controller";
import { findExerciseController } from "./find-exercise.controller";
import { createExerciseController } from "./create-exercise.controller";
import { updateExerciseController } from "./update-exercise.controller";
import { deleteExerciseController } from "./delete-exercise.controller";
import { createExerciseSchema, deleteExerciseSchema, findAllExercisesSchema, findExerciseSchema, updateExerciseSchema } from "../../../docs/schemas/exercises.schema";

export function exercisesRoutes(app: FastifyTypedInstance) {
    app.get("/exercises", {
        preHandler: [app.authenticate],
        schema: findAllExercisesSchema
    }, findAllExercisesController);
    app.get("/exercises/:id", {
        preHandler: [app.authenticate],
        schema: findExerciseSchema
    }, findExerciseController);
    app.post("/exercises", {
        preHandler: [app.authenticate],
        schema: createExerciseSchema
    }, createExerciseController);
    app.put("/exercises/:id", {
        preHandler: [app.authenticate],
        schema: updateExerciseSchema
    }, updateExerciseController);
    app.delete("/exercises/:id", {
        preHandler: [app.authenticate],
        schema: deleteExerciseSchema
    }, deleteExerciseController);
}
