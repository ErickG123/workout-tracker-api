import { beforeEach, describe, expect, it } from "vitest";
import { UsersRepository } from "../../../../repositories/users.repository";
import { CreateUserUseCase } from "../../../../use-cases/users/create-user.use-case";
import { FindUserUseCase } from "../../../../use-cases/users/find-user.use-case";
import { InMemoryUsersRepository } from "../../../../repositories/in-memory/in-memory-users.repository";
import { createTestUser } from "../../../utils/create-test-user";
import { UserNotFound } from "../../../../use-cases/errors/user-not-found.error";
import { faker } from "@faker-js/faker";

let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let findUserUseCase: FindUserUseCase;

beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    findUserUseCase = new FindUserUseCase(usersRepository);
})

describe("Find User Use Case", () => {
    it("should return a user", async () => {
        const { user } = await createTestUser(createUserUseCase);

        const { user: existingUser } = await findUserUseCase.execute({
            id: user.id
        });

        expect(existingUser).toBeDefined();
        expect(existingUser?.id).toBe(user.id);
        expect(existingUser?.name).toBe(user.name);
        expect(existingUser?.email).toBe(user.email);
        expect(existingUser?.password).toBe(user.password);
    });

    it("should throw error if user not found", async () => {
        await expect(() =>
            findUserUseCase.execute({
                id: faker.string.uuid()
            })
        ).rejects.toBeInstanceOf(UserNotFound);
    });
});
