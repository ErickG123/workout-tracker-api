import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users.repository";
import { validateNonEmptyString } from "../../lib/validators/validate-non-empty-string";
import { UserNotFound } from "../errors/user-not-found.error";

interface UpdateUserUseCaseRequestParams {
    id: string
}

interface UpdateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute(
        { id }: UpdateUserUseCaseRequestParams,
        { name, email, password }: UpdateUserUseCaseRequest
    ): Promise<UpdateUserUseCaseResponse> {
        validateNonEmptyString(name, "User name");
        validateNonEmptyString(email, "Email");
        validateNonEmptyString(password, "Password");

        const userExists = await this.usersRepository.findById(id);

        if (!userExists) throw new UserNotFound();

        const user = await this.usersRepository.update(
            id,
            {
                name,
                email,
                password
            }
        );

        return { user };
    }
}
