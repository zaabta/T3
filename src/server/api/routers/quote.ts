import { createTRPCRouter, protectedProcedure } from "../trpc";
import { quoteInput } from "y/types";
import * as res from "y/server/helper";
import { z } from "zod";

export const quoteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(quoteInput)
    .mutation(async ({ ctx, input }) => {
      const newQuote = await ctx.prisma.quote.create({
        data: {
          content: input.content,
          categoryId: input.categoryId,
          userId: ctx.session.user.id,
        },
      });
      return newQuote
        ? res.successWithMessage("your quote created successfully", newQuote)
        : res.failedWithMessage("failed to create new quote");
    }),
  all: protectedProcedure
    .input(
      z.object({
        page: z
          .number({ required_error: "the number of page is requird" })
          .min(0, {
            message: "page number should be !",
          }),
      })
    )
    .query(async ({ ctx, input }) => {
      const quotes = await ctx.prisma.quote.findMany({
        where: {
          deletedAt: null,
          category:{
            deletedAt: null
          }
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: 3,
        skip: input.page - 1 > 0 ? input.page - 1 : 0,
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return quotes.length > 0
        ? res.successWithMessage("get the quotes successfully", quotes)
        : res.failedWithMessage("failed to create new quote");
    }),
  myQuotes: protectedProcedure.query(async ({ ctx }) => {
    const myQuotes = await ctx.prisma.quote.findMany({
      where: {
        userId: ctx.session.user.id,
        deletedAt: null,
      },
      include: {
        category: {
          select: {
            createdAt: false,
            updateAt: false,
            deletedAt: false,
          },
        },
      },
    });
    return myQuotes.length > 0
      ? res.success("get it quotes successfully", myQuotes)
      : res.failedWithMessage("failed to get it");
  }),
  update: protectedProcedure
    .input(
      z.object({
        quoteId: z.string({ required_error: "quoteId is required" }),
        content: z.string({ required_error: "content is required" }),
        categoryId: z.string({ required_error: "category is required" }),
      })
    )
    .query(async ({ ctx, input }) => {
      const updateQuote = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          quotes: {
            update: {
              where: {
                id: input.quoteId,
              },
              data: {
                categoryId: input.categoryId,
                content: input.content,
              },
            },
          },
        },
      });
      return updateQuote
        ? res.successWithMessage("update it successfully", updateQuote)
        : res.failedWithMessage("failed to update !");
    }),
  delete: protectedProcedure
    .input(
      z.object({
        quoteId: z.string({
          required_error: "select the quote please !",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedQuote = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          quotes: {
            update: {
              where: {
                id: input.quoteId,
              },
              data: {
                deletedAt: new Date(),
              },
            },
          },
        },
      });
      return deletedQuote
        ? res.successWithMessage("remove it successfully", deletedQuote)
        : res.failedWithMessage("could not be removed");
    }),
  getByCategoryName: protectedProcedure
    .input(
      z.object({
        name: z.string({
          required_error: "name of category is required !",
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      const quotes = await ctx.prisma.quote.findMany({
        where: {
          categoryId: input.name,
          deletedAt: null
        },
        select: {
          id: true,
          content: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return quotes
        ? res.successWithMessage("got it successfully", quotes)
        : res.failedWithMessage("failed to it");
    }),
});
