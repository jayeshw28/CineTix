import { create } from "domain";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { schemaCreateMovie } from "@/forms/createMovie";
import { z } from "zod";
import { findManyMovieArgsSchema } from "./input/movies.input";

export const movieRouter = createTRPCRouter({
  moviesPerCinema: publicProcedure
    .input(findManyMovieArgsSchema)
    .input(z.object({ cinemaId: z.number() }))
    .query(async ({ input, ctx }) => {
      const { cursor, distinct, orderBy, skip, take, where, cinemaId } = input;

      return ctx.db.movie.findMany({
        cursor,
        distinct,
        orderBy,
        skip,
        take,
        where: {
          ...where,
          ShowTime: {
            some: {
              startTime: {
                gt: new Date(),
              },
              Screen: {
                cinemaId,
              },
            },
          },
        },
      });
    }),
  movies: publicProcedure.query(({ ctx }) => {
    return ctx.db.movie.findMany();
  }),
  createMovie: protectedProcedure("admin")
    .input(schemaCreateMovie)
    .mutation(({ ctx, input }) => {
      return ctx.db.movie.create({
        data: input,
      });
    }),
});
