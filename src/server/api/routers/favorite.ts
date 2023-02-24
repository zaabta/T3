import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import * as res from "y/server/helper"

export const favoriteRouter = createTRPCRouter({
    favorite: protectedProcedure.input(z.object({
        quoteId: z.string({
            required_error: "quote is required !"
        })
    })).query(async ({ ctx, input })=>{
        const favoriteQuote = await ctx.prisma.favorite.create({
            data:{
                userId: ctx.session.user.id,
                quoteId: input.quoteId
            }
        })
        return favoriteQuote ? res.successWithMessage(`add it to your favorite`, favoriteQuote): 
        res.failedWithMessage("failed to add it to your favorite")
    }),

    unfavorite: protectedProcedure.input(z.object({
        quoteId: z.string({
            required_error: "quote is required !"
        })
    })).query(async ({ ctx , input}) => {
        const unfavoriteQuote = await ctx.prisma.favorite.delete({
            where: {
                userId_quoteId: {quoteId: input.quoteId, userId: ctx.session.user.id}
            }
        })
        return unfavoriteQuote ? res.successWithMessage("remove it form your favoriteQuote", unfavoriteQuote):
        res.failedWithMessage("did not remove it form  your favoriteQuote")
    })
    
})