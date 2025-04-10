import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUserUseCase } from "../../../use-cases/factories/users/make-authenticate-user-use-case";
import { generateAndSetTokens } from "../../utils/generate-and-set-token";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error";

const bodySchema = z.object({
    email: z.string(),
    password: z.string()
});

export async function authenticateUserController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body);

    const authenticateUserUseCase = makeAuthenticateUserUseCase();

    try {
        const { user } = await authenticateUserUseCase.execute(body);

        const accessToken = await generateAndSetTokens({
            reply,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

        return reply.status(201).send({ token: accessToken });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
