import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateUserUseCase } from "../../../use-cases/factories/users/make-update-user-use-case";
import { UserNotFound } from "../../../use-cases/errors/user-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});

export async function updateUserController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const updateUserUseCase = makeUpdateUserUseCase();

    try {
        const { user } = await updateUserUseCase.execute(params, body);

        return reply.status(200).send(user);
    } catch (error) {
        if (error instanceof UserNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}