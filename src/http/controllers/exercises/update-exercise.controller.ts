import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateExerciseUseCase } from "../../../use-cases/factories/exercises/make-update-exercise-use-case";
import { ExerciseNotFound } from "../../../use-cases/errors/exercise-not-found";

const paramsSchema = z.object({
    id: z.string().uuid()
});

const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    categoryId: z.string().uuid(),
    muscleGroupId: z.string().uuid()
});

export async function updateExerciseController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const updateExerciseUseCase = makeUpdateExerciseUseCase();

    try {
        const { exercise } = await updateExerciseUseCase.execute(params, body);

        return reply.status(200).send(exercise);
    } catch (error) {
        if (error instanceof ExerciseNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
