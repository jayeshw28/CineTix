import { useForm } from "react-hook-form";
import { ReactNode } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Genre } from "@prisma/client";

export const schemaCreateMovie = z.object({
  title: z.string().min(1, { message: "Movie name is required" }),
  genre: z.nativeEnum(Genre),
  director: z.string().min(1, { message: "Director name is required" }),
  duration: z.number({ invalid_type_error: "Duration is required." }),
  releaseDate: z.string(),
  posterUrl: z.any(),
});

export type FormTypeCreateMovie = z.infer<typeof schemaCreateMovie>;

export const useFormCreateMovie = () => {
  return useForm<FormTypeCreateMovie>({
    resolver: zodResolver(schemaCreateMovie),
  });
};
