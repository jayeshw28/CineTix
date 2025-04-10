import { StatCard } from "@/components/organisms/StatCard";
import { UserCard } from "@/components/organisms/UserCard";
import { trpcServer } from "@/trpc/clients/server";

export default async function Page() {
  const dashboard = await trpcServer.managers.dashboard.query();
  const managerMe = await trpcServer.managers.managerMe.query();
  return (
    <div className="flex flex-col gap-4">
      <h1 className=" mb-4">Manager Page</h1>

      <div className="grid grid-cols-1 mt-2 mb-4 sm:grid-cols-1 md:grid-cols-1 gap-3">
        <UserCard
          key={managerMe?.User.id}
          user={{
            id: managerMe?.User.id || "",
            image: managerMe?.User.image || "",
            name: managerMe?.User.name || "",
          }}
        />
      </div>

      <main className="flex flex-col gap-3">
        <StatCard href={"manager/cinema"} title={"Cinemas"}>
          {dashboard.cinemaCount}
        </StatCard>
        <StatCard href={"manager/showtimes"} title={"Showtimes"}>
          {dashboard.showtimeCount}
        </StatCard>
      </main>
    </div>
  );
}
