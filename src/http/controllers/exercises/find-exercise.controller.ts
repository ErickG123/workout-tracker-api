import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindExerciseUseCase } from "../../../use-cases/factories/exercises/make-find-exercise-use-case";
import { ExerciseNotFound } from "../../../use-cases/errors/exercise-not-found";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function findExerciseController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const findExerciseUseCase = makeFindExerciseUseCase();

    try {
        const { exercise } = await findExerciseUseCase.execute(params);

        return reply.status(200).send(exercise);
    } catch (error) {
        if (error instanceof ExerciseNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
