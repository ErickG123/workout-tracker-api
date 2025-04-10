import { describe, expect, it } from "vitest";
import { InMemoryMuscleGroupsRepository } from "../../../../repositories/in-memory/in-memory-muscle-groups.repository";
import { UpdateMuscleGroupUseCase } from "../../../../use-cases/muscle-groups/update-muscle-group.use-case";
import { CreateMuscleGroupUseCase } from "../../../../use-cases/muscle-groups/create-muscle-group.use-case";
import { faker } from "@faker-js/faker";

describe("Update Muscle Group Use Case", () => {
    it("should update a muscle group name", async () => {
        const muscleGroupsRepository = new InMemoryMuscleGroupsRepository();
        const createMuscleGroupUseCase = new CreateMuscleGroupUseCase(muscleGroupsRepository);
        const updateMuscleGroupUseCase = new UpdateMuscleGroupUseCase(muscleGroupsRepository);

        const name = faker.word.words();
        const newName = faker.word.words();

        const { muscleGroup } = await createMuscleGroupUseCase.execute({
            name: name
        });

        const { muscleGroup: updatedMuscleGroup } = await updateMuscleGroupUseCase.execute(
            { id: muscleGroup.id },
            { name: newName }
        );

        expect(typeof updatedMuscleGroup.name).toBe("string");
        expect(updatedMuscleGroup.name).toBe(newName);
    });
});
