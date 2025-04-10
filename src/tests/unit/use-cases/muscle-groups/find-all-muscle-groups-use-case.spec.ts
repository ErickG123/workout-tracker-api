import { describe, expect, it } from "vitest";
import { InMemoryMuscleGroupsRepository } from "../../../../repositories/in-memory/in-memory-muscle-groups.repository";
import { CreateMuscleGroupUseCase } from "../../../../use-cases/muscle-groups/create-muscle-group.use-case";
import { FindAllMuscleGroupsUseCase } from "../../../../use-cases/muscle-groups/find-all-muscle-groups.use-case";
import { faker } from "@faker-js/faker";

describe("Find All Muscle Groups Use Case", () => {
    it("should return all muscle groups", async () => {
        const muscleGroupsRepository = new InMemoryMuscleGroupsRepository();
        const createMuscleGroupUseCase = new CreateMuscleGroupUseCase(muscleGroupsRepository);
        const findAllMuscleGroupsUseCase = new FindAllMuscleGroupsUseCase(muscleGroupsRepository);

        const name = faker.word.words();
        const otherName = faker.word.words();

        await createMuscleGroupUseCase.execute({
            name: name
        });

        await createMuscleGroupUseCase.execute({
            name: otherName
        });

        const { muscleGroups } = await findAllMuscleGroupsUseCase.execute();

        expect(muscleGroups.length).toBe(2);
        expect(muscleGroups[0]).toHaveProperty("id");
        expect(muscleGroups[0].name).toBe(name);
        expect(muscleGroups[1]).toHaveProperty("id");
        expect(muscleGroups[1].name).toBe(otherName);
    });

    it("should return an empty array if no muscle groups exist", async () => {
        const muscleGroupsRepository = new InMemoryMuscleGroupsRepository();
        const findAllMuscleGroupsUseCase = new FindAllMuscleGroupsUseCase(muscleGroupsRepository);

        const { muscleGroups } = await findAllMuscleGroupsUseCase.execute();

        expect(muscleGroups).toEqual([]);
    });
});
