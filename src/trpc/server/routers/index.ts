import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { z } from "zod";
import { movieRouter } from "./movies";
import { adminsRoutes } from "./admins";
import { cinemaRouter } from "./cinema";

export const appRouter = createTRPCRouter({
  movies: movieRouter,
  admins: adminsRoutes,
  cinemas: cinemaRouter,
});

export type AppRouter = typeof appRouter;
