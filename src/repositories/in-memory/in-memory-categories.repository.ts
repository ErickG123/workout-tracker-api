import { Category, Prisma } from "@prisma/client";
import { CategoriesRepository } from "../categories.repository";
import { randomUUID } from "crypto";
import { CategoryNotFound } from "../../use-cases/errors/category-not-found.error";

export class InMemoryCategoriesRepository implements CategoriesRepository {
    public items: Category[] = [];

    async findById(id: string): Promise<Category | null> {
        const category = this.items.find(item => item.id == id);

        return category || null;
    }

    async findAll(): Promise<Category[] | null> {
        const categories = this.items;

        return categories;
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        const category: Category = {
            id: randomUUID(),
            name: data.name
        }

        this.items.push(category);

        return category;
    }

    async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
        const index = this.items.findIndex(item => item.id == id);

        if (index == -1) throw new CategoryNotFound();

        const existingCategory = this.items[index];

        const updatedCategory: Category = {
            ...existingCategory,
            name: data.name as string ?? existingCategory.name
        }

        this.items[index] = updatedCategory;

        return updatedCategory;
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex(item => item.id == id);

        if (index == -1) return;

        this.items.splice(index, 1);
    }
}
