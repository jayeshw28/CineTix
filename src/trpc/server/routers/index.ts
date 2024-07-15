import { createTRPCRouter, publicProcedure } from "..";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    return { title: "News", content: "Jayesh here" };
  }),
});

export type AppRouter = typeof appRouter;
