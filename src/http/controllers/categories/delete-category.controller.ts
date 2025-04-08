import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteCategoryUseCase } from "../../../use-cases/factories/categories/make-delete-category-use-case";
import { CategoryNotFound } from "../../../use-cases/errors/category-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function deleteCategoryController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const deleteCategoryUseCase = makeDeleteCategoryUseCase();

    try {
        await deleteCategoryUseCase.execute(params);

        return reply.status(204).send({ message: "Category Deleted" });
    } catch (error) {
        if (error instanceof CategoryNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
