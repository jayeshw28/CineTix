import { trpcClient } from "@/trpc/clients/client";
import { trpcServer } from "@/trpc/clients/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const movies = await trpcServer.movies.movies.query();
  return (
    <main className="">
      Hello
      <UserButton />
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div>{movie.title}</div>
            <div>{movie.duration} mins</div>
            <div>{movie.genre}</div>
            <div>{movie.director}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
