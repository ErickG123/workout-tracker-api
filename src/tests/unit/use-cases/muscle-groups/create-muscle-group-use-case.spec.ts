import { describe, expect, it } from "vitest";
import { InMemoryMuscleGroupsRepository } from "../../../../repositories/in-memory/in-memory-muscle-groups.repository";
import { CreateMuscleGroupUseCase } from "../../../../use-cases/muscle-groups/create-muscle-group.use-case";
import { faker } from "@faker-js/faker";

describe("Create Muscle Group Use Case", () => {
    it("should create a muscle group with a valid name", async () => {
        const muscleGroupsRepository = new InMemoryMuscleGroupsRepository();
        const createMuscleGroupUseCase = new CreateMuscleGroupUseCase(muscleGroupsRepository);

        const name = faker.word.words();

        const { muscleGroup } = await createMuscleGroupUseCase.execute({
            name: name
        });

        expect(muscleGroup).toHaveProperty("id");
        expect(typeof muscleGroup.name).toBe("string");
        expect(muscleGroup.name).toBe(name);
    });

    it("should throw an error if the name is empty string", async () => {
        const muscleGroupsRepository = new InMemoryMuscleGroupsRepository();
        const createMuscleGroupUseCase = new CreateMuscleGroupUseCase(muscleGroupsRepository);

        await expect(() => 
            createMuscleGroupUseCase.execute({ name: "" })
        ).rejects.toThrow("Muscle group name cannot be an empty string");
    });
});
