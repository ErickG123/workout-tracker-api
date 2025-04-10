import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users.repository";
import { prisma } from "../../lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }

    async findAll(): Promise<User[] | null> {
        const users = await prisma.user.findMany();

        return users;
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        try {
            const user = await prisma.user.create({
                data
            });

            return user;
        } catch (error) {
            console.error("Error Creating User: ", error);
            throw error;
        }
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        try {
            const user = await prisma.user.update({
                where: {
                    id
                },
                data
            });

            return user;
        } catch (error) {
            console.error("Error Updating User: ", error);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.user.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error("Error Deliting User: ", error);
            throw error;
        }
    }
}
