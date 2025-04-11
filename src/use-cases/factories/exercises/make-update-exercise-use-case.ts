import { PrismaExercisesRepositry } from "../../../repositories/prisma/prisma-exercises.repository";
import { UpdateExerciseUseCase } from "../../exercises/update-exercise.use-case";

export function makeUpdateExerciseUseCase() {
    return new UpdateExerciseUseCase(new PrismaExercisesRepositry);
}
