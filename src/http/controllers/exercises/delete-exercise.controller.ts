import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteExerciseUseCase } from "../../../use-cases/factories/exercises/make-delete-exercise-use-case";
import { ExerciseNotFound } from "../../../use-cases/errors/exercise-not-found";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function deleteExerciseController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const deleteExerciseUseCase = makeDeleteExerciseUseCase();

    try {
        await deleteExerciseUseCase.execute(params);

        return reply.status(204).send({ message: "Exercise Deleted" });
    } catch (error) {
        if (error instanceof ExerciseNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
