import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CategoryNotFound } from "../../../use-cases/errors/category-not-found.error";
import { makeUpdateCategoryUseCase } from "../../../use-cases/factories/categories/make-update-category-use-case";

const paramsSchema = z.object({
    id: z.string().uuid()
});

const bodySchema = z.object({
    name: z.string()
});

export async function updateCategoryController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const updateCategoryUseCase = makeUpdateCategoryUseCase();

    try {
        const { category } = await updateCategoryUseCase.execute(params, body);

        return reply.status(200).send(category);
    } catch (error) {
        if (error instanceof CategoryNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
