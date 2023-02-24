import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import * as res from "y/server/helper"
import { enforceUserIsAdmin } from "../trpc";

export const categoryRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx })=> {
        const categories = await ctx.prisma.category.findMany({
            where:{
                deletedAt: null
            },
            select: {
                id: true,
                name: true
            }
        })
        return categories ? res.successWithMessage("The categories got successfully", categories): 
        res.failedWithMessage("failed to get the categories !")
    }),
    create: protectedProcedure.use(enforceUserIsAdmin).input(z.object({
        name: z.string({
            required_error: "category name is required",
        })
    })).query(async ({ ctx, input }) => {
        const newCategory = await ctx.prisma.category.create({
            data:{
                name: input.name
            }
        })
        return newCategory ? res.successWithMessage("The new category is created successfully", newCategory): 
        res.failedWithMessage("failed to create the category !")
    }),
    delete: protectedProcedure.use(enforceUserIsAdmin).input(z.object({
        categoryId: z.string()
    })).query(async ({ ctx, input })=> {
        const deletedCategory = await ctx.prisma.category.update({
            where: {
                id: input.categoryId
            },
            data: {
                deletedAt: new Date()
            }
        })
        return deletedCategory ? res.successWithMessage("successfully remove it",deletedCategory)
        :res.failedWithMessage("failed to remove it")
    })
})