import { PrismaExercisesRepositry } from "../../../repositories/prisma/prisma-exercises.repository";
import { FindAllExercisesUseCase } from "../../exercises/find-all-exercises.use-case";

export function makeFindAllExercisesUseCase() {
    return new FindAllExercisesUseCase(new PrismaExercisesRepositry);
}
