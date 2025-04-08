import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteMuscleGroupUseCase } from "../../../use-cases/factories/muscle-groups/make-delete-muscle-group-use-case";
import { MuscleGroupNotFound } from "../../../use-cases/errors/muscle-group-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function deleteMuscleGroupController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const deleteMuscleGroupUseCase = makeDeleteMuscleGroupUseCase();

    try {
        await deleteMuscleGroupUseCase.execute(params);

        return reply.status(204).send({ message: "Muscle Group Deleted" });
    } catch (error) {
        if (error instanceof MuscleGroupNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
