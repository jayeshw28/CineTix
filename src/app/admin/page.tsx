import { StatCard } from "@/components/organisms/StatCard";
import { UserCard } from "@/components/organisms/UserCard";
import { trpcServer } from "@/trpc/clients/server";

export default async function Page() {
  const dashboard = await trpcServer.admins.dashboard.query();
  const adminMe = await trpcServer.admins.adminMe.query();
  return (
    <div>
      <h1 className=" mb-4">Admin Page</h1>

      <div className="grid grid-cols-1 mt-2 mb-4 sm:grid-cols-1 md:grid-cols-1 gap-3">
        <UserCard
          key={adminMe?.User.id}
          user={{
            id: adminMe?.User.id || "",
            image: adminMe?.User.image || "",
            name: adminMe?.User.name || "",
          }}
        />
      </div>

      <main className="flex flex-col gap-3">
        <StatCard href={"admin/admins"} title={"Admin"}>
          {dashboard.adminCount}
        </StatCard>
        <StatCard href={"admin/managers"} title={"managers"}>
          {dashboard.managerCount}
        </StatCard>
        <StatCard href={"admin/users"} title={"Users"}>
          {dashboard.userCount}
        </StatCard>
        <StatCard href={"admin/cinemas"} title={"Cinemas"}>
          {dashboard.cinemaCount}
        </StatCard>
        <StatCard href={"admin/movies"} title={"Movies"}>
          {dashboard.movieCount}
        </StatCard>
      </main>
    </div>
  );
}
