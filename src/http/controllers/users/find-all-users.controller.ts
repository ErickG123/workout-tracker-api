import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindAllUsersUseCase } from "../../../use-cases/factories/users/make-find-all-users-use-case";

export async function findAllUsersController(request: FastifyRequest, reply: FastifyReply) {
    const findAllUsersUseCase = makeFindAllUsersUseCase();

    try {
        const { users } = await findAllUsersUseCase.execute();

        return reply.status(200).send(users);
    } catch (error) {
        return reply.status(400).send(error);
    }
}
