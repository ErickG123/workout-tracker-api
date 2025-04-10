import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../repositories/in-memory/in-memory-users.repository";
import { CreateUserUseCase } from "../../../../use-cases/users/create-user.use-case";
import { faker } from "@faker-js/faker";
import { compare } from "bcrypt";
import { createTestUser } from "../../../utils/create-test-user";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
});

describe("Create User Use Case", () => {
    it("should create a user", async () => {
        const { user, name, email, password } = await createTestUser(createUserUseCase);

        const doesPasswordMatches = await compare(password, user.password);

        expect(user).toHaveProperty("id");
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        expect(doesPasswordMatches).toBe(true);
    });

    it("should not create user with empty name", async () => {
        const name = "";
        const email = faker.internet.email();
        const password = faker.internet.password();

        await expect(() =>
            createUserUseCase.execute({
                name,
                email,
                password
            })
        ).rejects.toThrow("User name cannot be an empty string");
    });

    it("should not create user with empty email", async () => {
        const name = faker.person.fullName();
        const email = "";
        const password = faker.internet.password();

        await expect(() =>
            createUserUseCase.execute({
                name,
                email,
                password
            })
        ).rejects.toThrow("Email cannot be an empty string");
    });

    it("should not create user with empty password", async () => {
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const password = "";

        await expect(() =>
            createUserUseCase.execute({
                name,
                email,
                password
            })
        ).rejects.toThrow("Password cannot be an empty string");
    });
});
