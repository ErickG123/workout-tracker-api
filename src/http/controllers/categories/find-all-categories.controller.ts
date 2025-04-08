import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindAllCategoriesUseCase } from "../../../use-cases/factories/categories/make-find-all-categories-use-case";

export async function findAllCategoriesController(request: FastifyRequest, reply: FastifyReply) {
    const findAllCategoriesUseCase = makeFindAllCategoriesUseCase();

    try {
        const { categories } = await findAllCategoriesUseCase.execute();

        return reply.status(200).send({ categories });
    } catch (error) {
        return reply.status(400).send(error);
    }
}
