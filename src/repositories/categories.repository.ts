import { Category, Prisma } from "@prisma/client";

export interface CategoriesRepository {
    findById(id: string): Promise<Category | null>
    findAll(): Promise<Category[] | null>
    create(data: Prisma.CategoryCreateInput): Promise<Category>
    update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>
    delete(id: string): Promise<void>
}
