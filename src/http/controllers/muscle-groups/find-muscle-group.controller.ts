import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindMuscleGroupUseCase } from "../../../use-cases/factories/muscle-groups/make-find-muscle-group-use-case";
import { MuscleGroupNotFound } from "../../../use-cases/errors/muscle-group-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function findMuscleGroupController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const findMuscleGroupUseCase = makeFindMuscleGroupUseCase();

    try {
        const { muscleGroup } = await findMuscleGroupUseCase.execute(params);

        return reply.status(200).send(muscleGroup);
    } catch (error) {
        if (error instanceof MuscleGroupNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
