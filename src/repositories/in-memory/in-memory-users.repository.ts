import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users.repository";
import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";
import { UserNotFound } from "../../use-cases/errors/user-not-found.error";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findById(id: string): Promise<User | null> {
        const user = this.items.find(user => user.id == id);

        return user || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(user => user.email == email);

        return user || null;
    }

    async findAll(): Promise<User[] | null> {
        const users = this.items;

        return users;
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user: User = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: faker.date.anytime()
        }

        this.items.push(user);

        return user;
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        const index = this.items.findIndex(user => user.id == id);

        if (index == -1) throw new UserNotFound;

        const existingUser = this.items[index];

        const updatedUser: User = {
            ...existingUser,
            name: data.name as string ?? existingUser.name,
            email: data.email as string ?? existingUser.email,
            password: data.password as string ?? existingUser.password
        }

        this.items[index] = updatedUser;

        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex(user => user.id == id);

        if (index == -1) throw new UserNotFound;

        this.items.splice(index, 1);
    }
}
