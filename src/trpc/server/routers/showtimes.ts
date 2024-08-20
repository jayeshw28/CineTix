import { schemaCreateShowtime } from "@/forms/createShowtime"
import { createTRPCRouter, protectedProcedure } from ".."
import { TRPCError } from "@trpc/server"

export const showtimesRoutes = createTRPCRouter({
    create: protectedProcedure("admin", "manager")
    .input(schemaCreateShowtime)
    .mutation(async ({ ctx, input }) => {
        const { movieId, screenId, showtimes } = input

        const [screen, movie] = await Promise.all([
            ctx.db.screen.findUnique({
                where: { id: screenId },
                include: { Cinema: {include: { Manager: true } } },
            }),
            ctx.db.movie.findUnique({ where: { id: movieId } })
        ])
        if(!screen || !movie) {
            throw new TRPCError({code: "BAD_REQUEST", message: "Screen/movie not found"})
        }

        return ctx.db.showTime.createMany({
            data: showtimes.map((showtimes) => ({
                screenId, 
                movieId, 
                startTime: new Date(showtimes.time),
            })),
        })
    }),
})