import { Link } from "../molecules/CustomLink";

export const UserMenu = () => {
  return (
    <div className="flex flex-col p-6 w-3/4 border-4 max-w-xs bg-white/30 backdrop-blur-md shadow-lg rounded-lg">
      <Link href="/user">Dashboard</Link>
      <Link href="/user/tickets">Tickets</Link>
    </div>
  );
};
