"use client";
import { FormProviderCreateShowtime } from "@/forms/createShowtime";
import { CreateShowtimes } from "@/components/templates/CreateShowtimes";

export default async function Page() {
  return (
    <FormProviderCreateShowtime>
      <CreateShowtimes />
    </FormProviderCreateShowtime>
  );
}
