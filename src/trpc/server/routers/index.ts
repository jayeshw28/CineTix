import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { z } from "zod";
import { movieRouter } from "./movies";
import { adminsRoutes } from "./admins";

export const appRouter = createTRPCRouter({
  movies: movieRouter,
  admins: adminsRoutes,
});

export type AppRouter = typeof appRouter;
