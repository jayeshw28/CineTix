import { schemaCreateCinema } from "@/forms/createCinema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { findManyCinemaArgsSchema } from "./input/cinemas.input";
import { locationFilter } from "./input/common.input";
import { z } from "zod";

export const cinemaRouter = createTRPCRouter({
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
