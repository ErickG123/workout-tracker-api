import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../repositories/in-memory/in-memory-users.repository";
import { CreateUserUseCase } from "../../../../use-cases/users/create-user.use-case";
import { createTestUser } from "../../../utils/create-test-user";
import { FindAllUsersUseCase } from "../../../../use-cases/users/find-all-users.use-case";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let findAllUserUseCase: FindAllUsersUseCase;

beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    findAllUserUseCase = new FindAllUsersUseCase(usersRepository);
});

describe("Find All Users Use Case", () => {
    it("should find all users", async () => {
        await createTestUser(createUserUseCase);
        await createTestUser(createUserUseCase);

        const { users } = await findAllUserUseCase.execute();

        expect(users.length).toBe(2);
        expect(users[0]).toHaveProperty("id");
        expect(users[1]).toHaveProperty("id");
    });

    it("should return undefined if no users exists", async () => {
        const { users } = await findAllUserUseCase.execute();

        expect(users).toEqual([]);
    });
});
