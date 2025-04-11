import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../repositories/in-memory/in-memory-users.repository";
import { DeleteUserUseCase } from "../../../../use-cases/users/delete-user.use-case";
import { CreateUserUseCase } from "../../../../use-cases/users/create-user.use-case";
import { faker } from "@faker-js/faker";
import { UserNotFound } from "../../../../use-cases/errors/user-not-found.error";
import { createTestUser } from "../../../utils/create-test-user";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;

beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
});

describe("Delete User Use Case", () => {
    it("should delete a user", async () => {
        const { user } = await createTestUser(createUserUseCase);

        await deleteUserUseCase.execute({
            id: user.id
        });

        const found = await usersRepository.findById(user.id);

        expect(found).toBeNull();
    });

    it("should throw error if user not found", async () => {
        await expect(() =>
            deleteUserUseCase.execute({
                id: faker.string.uuid()
            })
        ).rejects.toBeInstanceOf(UserNotFound);
    });
});
