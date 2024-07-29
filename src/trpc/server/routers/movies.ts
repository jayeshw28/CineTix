import { createTRPCRouter, publicProcedure } from "..";

export const movieRouter = createTRPCRouter({
  movies: publicProcedure.query(({ ctx }) => {
    return ctx.db.movie.findMany();
  }),
});
