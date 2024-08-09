import { createTRPCRouter, protectedProcedure } from "..";

export const adminsRoutes = createTRPCRouter({
  admins: protectedProcedure("admin").query(async ({ ctx }) => {
    return ctx.db.admin.findMany();
  }),
  adminMe: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.admin.findUnique({ where: { id: ctx.userId } });
  }),
});
