import { faker } from "@faker-js/faker";
import { CreateMuscleGroupUseCase } from "../../use-cases/muscle-groups/create-muscle-group.use-case";

export async function createTestMuscleGroup(createMuscleGroupUseCase: CreateMuscleGroupUseCase) {
    const name = faker.word.words();

    const { muscleGroup } = await createMuscleGroupUseCase.execute({
        name
    });

    return { muscleGroup, name };
}
