import { Link } from "../molecules/CustomLink";

export const AdminMenu = () => {
  return (
    <div className="flex flex-col p-6 w-3/4 border-4 max-w-xs bg-white/30 backdrop-blur-md shadow-lg rounded-lg">
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/cinemas">Cinemas</Link>
      <Link className="pl-4" href="/admin/cinemas/new">
        Create cinema
      </Link>
      <Link href="/admin/movies">Movies</Link>
      <Link className="pl-4" href="/admin/movies/new">
        Create movie
      </Link>
      <Link href="/admin/admins">Manage Admins</Link>
      <Link href="/admin/managers">Manage Managers</Link>
    </div>
  );
};
