import { faker } from "@faker-js/faker";
import { CreateUserUseCase } from "../../use-cases/users/create-user.use-case";

export async function createTestUser(createUserUseCase: CreateUserUseCase) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const { user } = await createUserUseCase.execute({
        name,
        email,
        password
    });

    return { user, name, email, password };
}
