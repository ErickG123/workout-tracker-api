import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindUserUseCase } from "../../../use-cases/factories/users/make-find-user-use-case";
import { UserNotFound } from "../../../use-cases/errors/user-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function findUserController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const findUserUseCase = makeFindUserUseCase();

    try {
        const { user } = await findUserUseCase.execute(params);

        return reply.status(200).send(user);
    } catch (error) {
        if (error instanceof UserNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
