import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteUserUseCase } from "../../../use-cases/factories/users/make-delete-user-use-case";
import { UserNotFound } from "../../../use-cases/errors/user-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function deleteUserController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const deleteUserUseCase = makeDeleteUserUseCase();

    try {
        await deleteUserUseCase.execute(params);

        return reply.status(204).send({ message: "User Deleted" });
    } catch (error) {
        if (error instanceof UserNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
