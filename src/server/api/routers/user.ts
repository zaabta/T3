import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "y/server/api/trpc"
import { signUpSchema } from "y/types"
import { hash } from "argon2"
import * as res from "y/server/helper"

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const newUser: any = await ctx.prisma.user
        .create({
          data: {
            username: input.username,
            email: input.email,
            password: await hash(input.password),
          },
        })
        .then((data) => {
          return res.successWithMessage(
            "your account registered successfully !",
          )
        })
        .catch((err) => {
          return res.failedWithMessage("this account is already registered !")
        })
      return newUser
    }),
  me: protectedProcedure.query(async ({ ctx }) => {
    const currUser = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
        deletedAt: null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        quotes: {
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
        },
        favorites: {
          select: {
            quote: {
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
            },
          },
        },
      },
    })
    return currUser
      ? res.successWithMessage("got your profile successfully :)", currUser)
      : res.failedWithMessage("failed to get your profile :(")
  }),
  authors: protectedProcedure.query(async ({ ctx }) => {
    try {
      const users = await ctx.prisma.quote.findMany({
        where: {},
        select: {
          user: {
            select: {
              id: true,
              username: true,
              _count: {
                select: {
                  quotes: true,
                },
              },
              photo: {
                select: {
                  url: true,
                },
              },
            },
          },
        },
      })
      return users
        ? res.successWithMessage("get user successfully !", [
            ...new Map(
              users.map((user) => [
                user.user.id,
                {
                  id: user.user.id,
                  name: user.user.username,
                  avatar: user.user.photo,
                  quotes: user.user._count.quotes,
                },
              ]),
            ).values(),
          ])
        : res.failedWithMessage("failed to get users")
    } catch (err) {
      console.log("ERROR->", err)
      return res.serverError()
    }
  }),
})
