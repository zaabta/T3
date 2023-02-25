import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verify } from "argon2";
import { prisma } from "y/server/db";
import { loginSchema } from "y/types";
import { env } from "y/env.mjs";
import { chownSync } from "fs";


/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: String;
      email: String;
    } & DefaultSession["user"];
  }
  
  enum UserRole {
    USER,
    ADMIN,
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.username; 
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        account: {
          label: "account",
          type: "text",
          placeholder: "jsmith or jsmith@gamil.com",
        },
        password: {
          label: "password",
          type: "text",
          placeholder: "jsmith",
        },
      },
      authorize: async (credentials, req) => {
        try {
          const creds = await loginSchema.parseAsync(credentials) as {account: string, password: string};
          const exists = await prisma.user.findFirst({
            where: {
              OR: [
                {
                  email: creds.account
                },
                {
                  username: creds.account,
                },
              ],
            },
          });
          return exists 
          ? (await verify(exists.password, creds.password))
              ? {
                  id: exists.id,
                  username: exists.username,
                  email: exists.email,
                }
              : null
            : null;
        } catch (err) {
          console.log(err);
          throw new Error("Authentication error");
        }
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 30 * 60, // 15 days,
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: env.JWT_SECRET,
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
    newUser: "/register",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
