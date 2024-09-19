import { schemaCreateCinema } from "@/forms/createCinema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { findManyCinemaArgsSchema } from "./input/cinemas.input";
import { locationFilter } from "./input/common.input";
import { z } from "zod";
import { SearchCinemas } from "@/components/templates/SearchCinemas";

export const cinemaRouter = createTRPCRouter({
  SearchCinemas: publicProcedure
    .input(findManyCinemaArgsSchema)
    .input(z.object({ locationFilter }))
    .query(({ ctx, input }) => {
      const { cursor, distinct, orderBy, skip, take, where, locationFilter } =
        input;
      const { ne_lng, ne_lat, sw_lng, sw_lat } = locationFilter;

      return ctx.db.cinema.findMany({
        cursor,
        distinct,
        orderBy,
        skip,
        take,
        where: {
          ...where,
          Address: {
            lat: {
              gte: sw_lat,
              lte: ne_lat,
            },
            lng: {
              gte: sw_lng,
              lte: ne_lng,
            },
          },
        },
        include: {
          Address: true,
        },
      });
    }),
  cinema: publicProcedure
    .input(z.object({ cinemaId: z.number().nullable() }))
    .query(({ ctx, input: { cinemaId } }) => {
      if (!cinemaId) {
        return null;
      }
      return ctx.db.cinema.findUnique({
        where: { id: cinemaId },
        include: { Address: true },
      });
    }),
  cinemas: publicProcedure.query(({ ctx, input }) => {
    return ctx.db.cinema.findMany({
      include: {
        Screen: { include: { ShowTime: { include: { Movie: true } } } },
      },
    });
  }),
  myCinemas: protectedProcedure().query(({ ctx }) => {
    return ctx.db.cinema.findMany({
      where: { Manager: { some: { id: ctx.userId } } },
      include: {
        Screen: {
          include: { ShowTime: { include: { Movie: true, Bookings: true } } },
        },
      },
    });
  }),
  myScreens: protectedProcedure().query(({ ctx }) => {
    return ctx.db.screen.findMany({
      where: {
        Cinema: {
          Manager: { some: { id: ctx.userId } },
        },
      },
      include: {
        Cinema: true,
      },
    });
  }),
  createCinema: protectedProcedure("admin")
    .input(schemaCreateCinema)
    .mutation(({ ctx, input }) => {
      const { address, cinemaName, screens, managerId } = input;

      const screensWithSeats = screens.map((screen, index) => {
        const { rows, columns, ProjectionType, SoundSystemType } = screen;
        const seats = [];

        for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
            seats.push({ row, column });
          }
        }

        return {
          projectionType: ProjectionType,
          soundSystemType: SoundSystemType,
          Seats: { create: seats },
          number: index,
        };
      });

      return ctx.db.cinema.create({
        data: {
          name: cinemaName,
          Address: { create: address },
          managerId: managerId,
          Manager: {
            connectOrCreate: {
              create: { id: managerId },
              where: { id: managerId },
            },
          },
          Screen: { create: screensWithSeats },
        },
      });
    }),
});
