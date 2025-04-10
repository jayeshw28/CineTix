import { Link } from "../molecules/CustomLink";

export const ManagerMenu = () => {
  return (
    <div className="flex flex-col p-6 w-3/4 border-4 max-w-xs bg-white/30 backdrop-blur-md shadow-lg rounded-lg">
      <Link href="/manager">Dashboard</Link>
      <Link href="/manager/cinemas">Cinemas</Link>
      <Link className="pl-4" href="/manager/cinemas/new-showtime">
        Create showtime
      </Link>
    </div>
  );
};
