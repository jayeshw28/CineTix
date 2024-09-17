import { z } from "zod";
import { intFilter, stringFilter, SortOrder } from "./common.input";
import { States, City } from "@prisma/client";

const cinemaOrderByWithRelationInputSchema = z.object({
  id: SortOrder,
  "Address.state": SortOrder,
  "Address.city": SortOrder,
});

const cinemaWhereInputSchemaPrimitive = z.object({
  id: intFilter,
  "Address.state": z.nativeEnum(States),
  "Address.city": z.nativeEnum(City),
});

export const cinemaWhereInputSchema = z.union([
  cinemaWhereInputSchemaPrimitive,

  z.object({
    AND: z.array(cinemaWhereInputSchemaPrimitive).optional(),
    OR: z.array(cinemaWhereInputSchemaPrimitive).optional(),
    NOT: z.array(cinemaWhereInputSchemaPrimitive).optional(),
  }),
]);

const cinemaWhereUniqueInputSchema = z.object({
  id: z.number(),
});

export const findManyCinemaArgsSchema = z.object({
  where: cinemaWhereInputSchema.optional(),
  orderBy: z.array(cinemaOrderByWithRelationInputSchema).optional(),
  cursor: cinemaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(z.enum(["id", "Address.state", "Address.city"])).optional(),
});

export const cinemaScalarFieldEnumSchema = z.enum([
  "id",
  "Address.state",
  "Address.city",
]);
