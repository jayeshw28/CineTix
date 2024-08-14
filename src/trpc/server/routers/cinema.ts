import { createTRPCRouter, publicProcedure } from "..";

export const cinemaRouter = createTRPCRouter({
  cinemas: publicProcedure.query(({ ctx }) => {
    return ctx.db.cinema.findMany({
      include: {
        Screen: {
          include: {
            ShowTime: {
              include: {
                Movie: true,
              },
            },
          },
        },
      },
    });
  }),
});
