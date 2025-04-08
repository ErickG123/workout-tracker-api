import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindCategoryUseCase } from "../../../use-cases/factories/categories/make-find-category-use-case";
import { CategoryNotFound } from "../../../use-cases/errors/category-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function findCategoryController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const findCategoryUseCase = makeFindCategoryUseCase();

    try {
        const { category } = await findCategoryUseCase.execute(params);

        return reply.status(200).send(category);
    } catch (error) {
        if (error instanceof CategoryNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
