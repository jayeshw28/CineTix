import { createTRPCRouter, publicProcedure } from "..";
import { z } from "zod";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    return { title: "News", content: "Lorem Ipsum" };
  }),
});

export type AppRouter = typeof appRouter;
