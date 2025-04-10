import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUserUseCase } from "../../../use-cases/factories/users/make-create-user-use-case";

const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body);

    const createUserUseCase = makeCreateUserUseCase();

    try {
        const { user } = await createUserUseCase.execute(body);

        return reply.status(201).send(user);
    } catch (error) {
        return reply.status(400).send(error);
    }
}
