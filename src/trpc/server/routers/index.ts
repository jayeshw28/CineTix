import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { z } from "zod";
import { movieRouter } from "./movies";

export const appRouter = createTRPCRouter({
  movies: movieRouter,
});

export type AppRouter = typeof appRouter;
