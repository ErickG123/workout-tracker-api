import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateMuscleGroupUseCase } from "../../../use-cases/factories/muscle-groups/make-update-muscle-group-use-case";
import { MuscleGroupNotFound } from "../../../use-cases/errors/muscle-group-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

const bodySchema = z.object({
    name: z.string()
});

export async function updateMuscleGroupController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const updateMuscleGroupUseCase = makeUpdateMuscleGroupUseCase();

    try {
        const { muscleGroup } = await updateMuscleGroupUseCase.execute(params, body);

        return { muscleGroup };
    } catch (error) {
        if (error instanceof MuscleGroupNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
