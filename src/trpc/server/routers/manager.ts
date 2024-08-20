import { createTRPCRouter, protectedProcedure } from "..";
import { schemaCreateManager } from "@/forms/createManager";

export const managerRoutes = createTRPCRouter({
  findAll: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.manager.findMany({ include: { User: true } });
  }),
  managerMe: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.manager.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    });
  }),
  create: protectedProcedure("admin")
    .input(schemaCreateManager)
    .mutation(({ ctx, input }) => {
      return ctx.db.manager.create({ data: { id: input.id } });
    }),
  dashboard: protectedProcedure("admin", "manager").query(async ({ ctx }) => {
    const uid = ctx.userId;
    const [cinema, showtime] = await Promise.all([
      ctx.db.cinema.count({ where: { Manager: { some: { id: uid } } } }),
      ctx.db.showTime.count({
        where: { Screen: { Cinema: { Manager: { some: { id: uid } } } } },
      }),
    ]);

    return {
      cinemaCount: cinema,
      showtimeCount: showtime,
    };
  }),
});
