import { CinemaInfo } from "@/components/organisms/CinemaInfo";
import { SearchCinemas } from "@/components/templates/SearchCinemas";
import { trpcClient } from "@/trpc/clients/client";
import { trpcServer } from "@/trpc/clients/server";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

export default async function Home() {
  const cinemas = await trpcServer.cinemas.cinemas.query();
  return (
    <main className="bg-gray-400 rounded-sm">
      <SearchCinemas />
    </main>
  );
}
