import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { z } from "zod";
import { movieRouter } from "./movies";
import { adminsRouter } from "./admins";
import { cinemaRouter } from "./cinema";
import { managerRoutes } from "./manager";
import { showtimesRoutes } from "./showtimes";
import { stripeRoutes } from "./stripe";
import { ticketsRoutes } from "./tickets";

export const appRouter = createTRPCRouter({
  movies: movieRouter,
  admins: adminsRouter,
  cinemas: cinemaRouter,
  showtimes: showtimesRoutes,
  managers: managerRoutes,
  stripe: stripeRoutes,
  tickets: ticketsRoutes,
});

export type AppRouter = typeof appRouter;
