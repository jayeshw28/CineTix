import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const schemaCreateShowtime = z.object({
  screenId: z.number(),
  movieId: z.number(),
  showtimes: z.array(z.object({ time: z.string() })),
});

export type FormTypeCreateShowtime = z.infer<typeof schemaCreateShowtime>;

export const useFormCreateShowtime = () => {
  return useForm<FormTypeCreateShowtime>({
    resolver: zodResolver(schemaCreateShowtime),
    // defaultValues: { movieId: -99, screenId: -99, showtimes: [] },
  });
};

export const FormProviderCreateShowtime = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const methods = useFormCreateShowtime();

  return <FormProvider {...methods}>{children}</FormProvider>;
};
