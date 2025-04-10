import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../repositories/in-memory/in-memory-users.repository";
import { CreateUserUseCase } from "../../../../use-cases/users/create-user.use-case";
import { AuthenticateUserUseCase } from "../../../../use-cases/users/authenticate-user.use-case";
import { createTestUser } from "../../../utils/create-test-user";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "../../../../use-cases/errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
})

describe("Authenticate User Use Case", () => {
    it("should authenticate user with valid credentials", async () => {
        const { user, password } = await createTestUser(createUserUseCase);

        const { user: authenticatedUser } = await authenticateUserUseCase.execute({
            email: user.email,
            password: password
        });

        expect(authenticatedUser).toBeDefined();
        expect(authenticatedUser.email).toBe(user.email);
    });

    it("should not authenticate with wrong email", async () => {
        const { user } = await createTestUser(createUserUseCase);

        await expect(() =>
            authenticateUserUseCase.execute({
                email: faker.internet.email(),
                password: user.password
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not authenticate with wrong password", async () => {
        const { user } = await createTestUser(createUserUseCase);

        await expect(() =>
            authenticateUserUseCase.execute({
                email: user.email,
                password: faker.internet.password()
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
