import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindAllExercisesUseCase } from "../../../use-cases/factories/exercises/make-find-all-exercises-use-case";
import { ExerciseNotFound } from "../../../use-cases/errors/exercise-not-found";

export async function findAllExercisesController(request: FastifyRequest, reply: FastifyReply) {
    const findAllExercisesUseCase = makeFindAllExercisesUseCase();

    try {
        const { exercises } = await findAllExercisesUseCase.execute();

        return reply.status(200).send(exercises);
    } catch (error) {
        if (error instanceof ExerciseNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
