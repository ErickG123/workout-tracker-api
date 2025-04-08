import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindAllMuscleGroupsUseCase } from "../../../use-cases/factories/muscle-groups/make-find-all-muscle-groups-use-case";

export async function findAllMuscleGroupsController(request: FastifyRequest, reply: FastifyReply) {
    const findAllMuscleGroupsUseCase = makeFindAllMuscleGroupsUseCase();

    try {
        const { muscleGroups } = await findAllMuscleGroupsUseCase.execute();

        return reply.status(200).send({ muscleGroups });
    } catch (error) {
        return reply.status(400).send(error);
    }
}
