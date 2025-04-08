import { Category, Prisma } from "@prisma/client";
import { CategoriesRepository } from "../categories.repository";
import { prisma } from "../../lib/prisma";

export class PrismaCategoriesRepository implements CategoriesRepository {
    async findById(id: string): Promise<Category | null> {
        try {
            const category = await prisma.category.findUnique({
                where: {
                    id
                }
            });

            return category;
        } catch (error) {
            console.error("Error Fetching Category");
            throw error;
        }
    }

    async findAll(): Promise<Category[] | null> {
        try {
            const categories = await prisma.category.findMany();

            return categories;
        } catch (error) {
            console.error("Error Fetching All Categories");
            throw error;
        }
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        try {
            const category = await prisma.category.create({
                data
            });

            return category;
        } catch (error) {
            console.error("Error Creating the Category");
            throw error;
        }
    }

    async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
        try {
            const category = await prisma.category.update({
                where: {
                    id
                },
                data
            });

            return category;
        } catch (error) {
            console.error("Error Updating the Category");
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.category.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error("Error Deleting the Category");
            throw error;
        }
    }
}
