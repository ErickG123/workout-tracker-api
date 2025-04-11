import { PrismaExercisesRepositry } from "../../../repositories/prisma/prisma-exercises.repository";
import { DeleteExerciseUseCase } from "../../exercises/delete-exercise.use-case";

export function makeDeleteExerciseUseCase() {
    return new DeleteExerciseUseCase(new PrismaExercisesRepositry);
}
