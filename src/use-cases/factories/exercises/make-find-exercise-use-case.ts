import { PrismaExercisesRepositry } from "../../../repositories/prisma/prisma-exercises.repository";
import { FindExerciseUseCase } from "../../exercises/find-exercise.use-case";

export function makeFindExerciseUseCase() {
    return new FindExerciseUseCase(new PrismaExercisesRepositry);
}
