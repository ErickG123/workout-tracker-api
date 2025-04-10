import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users.repository";

interface FindAllUsersUseCaseResponse {
    users: User[]
}

export class FindAllUsersUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute(): Promise<FindAllUsersUseCaseResponse> {
        const users = await this.usersRepository.findAll();

        return { users: users ?? []}
    }
}
