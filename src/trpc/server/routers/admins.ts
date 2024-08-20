import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "..";
import { schemaCreateAdmin } from "@/forms/createAdmin";

export const adminsRouter = createTRPCRouter({
  dashboard: protectedProcedure("admin").query(async ({ ctx }) => {
    const [movieCount, cinemaCount, userCount, adminCount, managerCount] =
      await Promise.all([
        ctx.db.movie.count(),
        ctx.db.cinema.count(),
        ctx.db.user.count(),
        ctx.db.admin.count(),
        ctx.db.manager.count(),
      ]);

    return {
      movieCount,
      cinemaCount,
      userCount,
      adminCount,
      managerCount,
    };
  }),

  findAll: protectedProcedure("admin").query(async ({ ctx }) => {
    return ctx.db.admin.findMany({ include: { User: true } });
  }),
  adminMe: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.admin.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    });
  }),
  create: protectedProcedure("admin")
    .input(schemaCreateAdmin)
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.admin.findUnique({ where: input });
      if (admin) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "the admin already exists.",
        });
      }
      return ctx.db.admin.create({ data: input });
    }),
});
