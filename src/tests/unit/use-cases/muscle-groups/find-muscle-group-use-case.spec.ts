import { describe, expect, it } from "vitest";
import { InMemoryMuscleGroupsRepository } from "../../../../repositories/in-memory/in-memory-muscle-groups.repository";
import { CreateMuscleGroupUseCase } from "../../../../use-cases/muscle-groups/create-muscle-group.use-case";
import { FindMuscleGroupUseCase } from "../../../../use-cases/muscle-groups/find-muscle-group.use-case";
import { faker } from "@faker-js/faker";
import { MuscleGroupNotFound } from "../../../../use-cases/errors/muscle-group-not-found.error";

describe("Find Muscle Group Use Case", () => {
    it("should return a muscle group by id", async () => {
        const muscleGroupsRepository = new InMemoryMuscleGroupsRepository();
        const createMuscleGroupUseCase = new CreateMuscleGroupUseCase(muscleGroupsRepository);
        const findMuscleGroupUseCase = new FindMuscleGroupUseCase(muscleGroupsRepository);

        const name = faker.word.words();

        const { muscleGroup } = await createMuscleGroupUseCase.execute({
            name: name
        });

        const { muscleGroup: existingMuscleGroup } = await findMuscleGroupUseCase.execute({
            id: muscleGroup.id
        });

        expect(existingMuscleGroup).toBeDefined();
        expect(existingMuscleGroup?.id).toBe(muscleGroup.id);
        expect(existingMuscleGroup?.name).toBe(muscleGroup.name);
    });

    it("should return undefined if muscle group not found", async () => {
        const muscleGroupsRepository = new InMemoryMuscleGroupsRepository();
        const findMuscleGroupUseCase = new FindMuscleGroupUseCase(muscleGroupsRepository);

        const uuid = faker.string.uuid();

        await expect(() =>
            findMuscleGroupUseCase.execute({ id: uuid })
        ).rejects.toBeInstanceOf(MuscleGroupNotFound);
    });
});
