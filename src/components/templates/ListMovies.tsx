import { trpcServer } from "@/trpc/clients/server";
import { MoviesInfo } from "../organisms/MovieInfo";

export interface ListMoviesProps {}

export const ListMovies = async ({}: ListMoviesProps) => {
  const movies = await trpcServer.movies.movies.query();

  return (
    <div className="grid grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MoviesInfo movie={movie} key={movie.id} />
      ))}
    </div>
  );
};
