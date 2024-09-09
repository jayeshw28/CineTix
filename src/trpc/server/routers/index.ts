import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { z } from "zod";
import { movieRouter } from "./movies";
import { adminsRouter } from "./admins";
import { cinemaRouter } from "./cinema";
import { managerRoutes } from "./manager";
import { showtimesRoutes } from "./showtimes";

export const appRouter = createTRPCRouter({
  movies: movieRouter,
  admins: adminsRouter,
  cinemas: cinemaRouter,
  showtimes: showtimesRoutes,
  managers: managerRoutes,
});

export type AppRouter = typeof appRouter;
