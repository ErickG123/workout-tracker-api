import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateExerciseUseCase } from "../../../use-cases/factories/exercises/make-create-exercise-use-case";

const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    categoryId: z.string().uuid(),
    muscleGroupId: z.string().uuid()
});

export async function createExerciseController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body);

    const createExerciseUseCase = makeCreateExerciseUseCase();

    try {
        const { exercise } = await createExerciseUseCase.execute(body);

        return reply.status(201).send(exercise);
    } catch (error) {
        return reply.status(400).send(error);
    }
}
