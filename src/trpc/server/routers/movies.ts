import { create } from "domain";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { schemaCreateMovie } from "@/forms/createMovie";

export const movieRouter = createTRPCRouter({
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
