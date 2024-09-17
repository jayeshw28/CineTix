import { schemaCreateShowtime } from "@/forms/createShowtime";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const showtimesRoutes = createTRPCRouter({
  showtimesPerCinema: publicProcedure
    .input(z.object({ cinemaId: z.number(), movieId: z.number() }))
    .query(async ({ input, ctx }) => {
      const { movieId, cinemaId } = input;

      const rawShowtimes = await ctx.db.showTime.findMany({
        where: {
          movieId: movieId,
          Screen: {
            cinemaId: cinemaId,
          },
          startTime: {
            gt: new Date(),
          },
        },
        orderBy: {
          startTime: "asc",
        },
        include: {
          Screen: true,
        },
      });

      // Group showtimes by date
      const showtimesByDate = reduceShowtimeByDate(rawShowtimes);

      // Convert object to the desired array format
      return Object.values(showtimesByDate);
    }),
  showtimesPerScreen: publicProcedure
    .input(z.object({ screenId: z.number() }))
    .query(async ({ input, ctx }) => {
      const { screenId } = input;

      const rawShowtimes = await ctx.db.showTime.findMany({
        where: {
          screenId,
          startTime: {
            gt: new Date(),
          },
        },
        orderBy: {
          startTime: "asc",
        },
        include: {
          Screen: true,
          Movie: true,
        },
      });

      // Group showtimes by date
      const showtimesByDate = reduceShowtimeByDate(rawShowtimes);

      // Convert object to the desired array format
      return Object.values(showtimesByDate);
    }),
  create: protectedProcedure("admin", "manager")
    .input(schemaCreateShowtime)
    .mutation(async ({ ctx, input }) => {
      const { movieId, screenId, showtimes } = input;

      const [screen, movie] = await Promise.all([
        ctx.db.screen.findUnique({
          where: { id: screenId },
          include: { Cinema: { include: { Manager: true } } },
        }),
        ctx.db.movie.findUnique({ where: { id: movieId } }),
      ]);
      if (!screen || !movie) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Screen/movie not found",
        });
      }

      return ctx.db.showTime.createMany({
        data: showtimes.map((showtimes) => ({
          screenId,
          movieId,
          startTime: new Date(showtimes.time),
        })),
      });
    }),
});

export const reduceShowtimeByDate = <T extends { startTime: Date }>(
  rawShowtimes: T[],
) => {
  return rawShowtimes.reduce(
    (grouped, showtime) => {
      const date = showtime.startTime.toISOString().split("T")[0];

      if (!grouped[date]) {
        grouped[date] = { date, showtimes: [] };
      }
      grouped[date].showtimes.push(showtime);

      return grouped;
    },
    {} as {
      [date: string]: {
        date: string;
        showtimes: T[];
      };
    },
  );
};
