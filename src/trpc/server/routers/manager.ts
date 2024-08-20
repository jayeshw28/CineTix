import { createTRPCRouter, protectedProcedure } from "..";
import { z } from "zod";
import { use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaCreateManager } from "@/forms/createManager";

export const managerRoutes = createTRPCRouter({
  findAll: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.manager.findMany({ include: { User: true } });
  }),
  create: protectedProcedure("admin")
    .input(schemaCreateManager)
    .mutation(({ ctx, input }) => {
      return ctx.db.manager.create({ data: { id: input.id } });
    }),
});
