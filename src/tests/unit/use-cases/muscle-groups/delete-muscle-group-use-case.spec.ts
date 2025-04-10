import { describe, expect, it } from "vitest";
import { InMemoryMuscleGroupsRepository } from "../../../../repositories/in-memory/in-memory-muscle-groups.repository";
import { DeleteMuscleGroupUseCase } from "../../../../use-cases/muscle-groups/delete-muscle-group.use-case";
import { CreateMuscleGroupUseCase } from "../../../../use-cases/muscle-groups/create-muscle-group.use-case";
import { faker } from "@faker-js/faker";

describe("Delete Muscle Group Use Case", () => {
    it("should delete a muscle group", async () => {
        const muscleGroupsRepository = new InMemoryMuscleGroupsRepository();
        const createMuscleGroupUseCase = new CreateMuscleGroupUseCase(muscleGroupsRepository);
        const deleteMuscleGroupUseCase = new DeleteMuscleGroupUseCase(muscleGroupsRepository);

        const name = faker.word.words();

        const { muscleGroup } = await createMuscleGroupUseCase.execute({
            name: name
        });

        await deleteMuscleGroupUseCase.execute({
            id: muscleGroup.id
        });

        const found = await muscleGroupsRepository.findById(muscleGroup.id);

        expect(found).toBeNull();
    });
});
