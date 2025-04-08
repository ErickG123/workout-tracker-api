import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateMuscleGroupUseCase } from "../../../use-cases/factories/muscle-groups/make-create-muscle-group-use-case";

const bodySchema = z.object({
    name: z.string()
});

export async function createMuscleGroupController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body);

    const createMuscleGroupUseCase = makeCreateMuscleGroupUseCase();

    try {
        const { muscleGroup } = await createMuscleGroupUseCase.execute(body);

        return reply.status(201).send(muscleGroup);
    } catch (error) {
        return reply.status(400).send(error);
    }
}
