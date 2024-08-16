import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectionType, SoundSystemType } from "@prisma/client";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const schemaCreateScreen = z.object({
  ProjectionType: z.nativeEnum(ProjectionType),
  SoundSystemType: z.nativeEnum(SoundSystemType),
  rows: z.number(),
  columns: z.number(),
  price: z.number(),
});

export const schemaCreateAddress = z.object({
  lat: z.number(),
  lng: z.number(),
  address: z.string(),
});

export const schemaCreateCinema = z.object({
  managerId: z.string().min(1, { message: "Manager ID is required" }),
  cinemaName: z.string().min(1, { message: "Cinema name is required" }),
  address: schemaCreateAddress,
  screens: z.array(schemaCreateScreen),
});

export type FormTypeCreateCinema = z.infer<typeof schemaCreateCinema>;

export const useFormCreateCinema = () =>
  useForm<FormTypeCreateCinema>({
    resolver: zodResolver(schemaCreateCinema),
    defaultValues: {
      address: { address: "", lat: 0, lng: 0 },
      cinemaName: "",
      screens: [],
    },
  });

export const FormProviderCreateCinema = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useFormCreateCinema();

  return <FormProvider {...methods}>{children}</FormProvider>;
};
