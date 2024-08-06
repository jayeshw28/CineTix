import { trpcClient } from "@/trpc/clients/client";
import { trpcServer } from "@/trpc/clients/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const movies = await trpcServer.movies.movies.query();
  return <main className="bg-gray-400"></main>;
}
