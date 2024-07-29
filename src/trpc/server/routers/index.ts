import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { z } from "zod";

export const appRouter = createTRPCRouter({
  hello: protectedProcedure("admin").query(({ ctx }) => {
    return { name: "jayesh Wankhede", age: 21 };
  }),
});

export type AppRouter = typeof appRouter;
