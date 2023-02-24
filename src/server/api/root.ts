import { createTRPCRouter } from "y/server/api/trpc";
import { userRouter } from "y/server/api/routers/user";
import { quoteRouter } from "y/server/api/routers/quote";
import { favoriteRouter } from "y/server/api/routers/favorite";
import { categoryRouter } from "y/server/api/routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  quote: quoteRouter,
  favorite: favoriteRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
