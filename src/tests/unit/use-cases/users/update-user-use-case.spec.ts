import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../repositories/in-memory/in-memory-users.repository";
import { CreateUserUseCase } from "../../../../use-cases/users/create-user.use-case";
import { UpdateUserUseCase } from "../../../../use-cases/users/update-user.use-case";
import { faker } from "@faker-js/faker";
import { createTestUser } from "../../../utils/create-test-user";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;

beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    updateUserUseCase = new UpdateUserUseCase(usersRepository);
});

describe("Update User Use Case", () => {
    it("should update a user name", async () => {
        const { user } = await createTestUser(createUserUseCase);

        const newName = faker.person.fullName();

        const { user: updatedUser } = await updateUserUseCase.execute(
            { id: user.id },
            {
                name: newName,
                email: user.email,
                password: user.password
            }
        );

        expect(updatedUser.name).toBe(newName);
    });

    it("should update a user password", async () => {
        const { user } = await createTestUser(createUserUseCase);

        const newPassword = faker.internet.password();

        const { user: updatedUser } = await updateUserUseCase.execute(
            { id: user.id },
            {
                name: user.name,
                email: user.email,
                password: newPassword
            }
        );

        expect(updatedUser.password).toBe(newPassword);
    });

    it("should not update user with empty name", async () => {
        const { user } = await createTestUser(createUserUseCase);

        await expect(() =>
            updateUserUseCase.execute(
                { id: user.id },
                {
                    name: "",
                    email: user.email,
                    password: user.password
                }
            )
        ).rejects.toThrow("User name cannot be an empty string");
    });

    it("should not update user with empty password", async () => {
        const { user } = await createTestUser(createUserUseCase);

        await expect(() =>
            updateUserUseCase.execute(
                { id: user.id },
                {
                    name: user.name,
                    email: user.email,
                    password: ""
                }
            )
        ).rejects.toThrow("Password cannot be an empty string");
    });
});
