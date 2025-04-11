import { PrismaExercisesRepositry } from "../../../repositories/prisma/prisma-exercises.repository";
import { CreateExerciseUseCase } from "../../exercises/create-exercise.use-case";

export function makeCreateExerciseUseCase() {
    return new CreateExerciseUseCase(new PrismaExercisesRepositry);
}
