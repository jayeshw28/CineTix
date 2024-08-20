import { CinemaInfo } from "@/components/organisms/CinemaInfo";
import { ListCinemas } from "@/components/templates/ListCinemas";
import { trpcServer } from "@/trpc/clients/server";

export default async function Page() {
  const cinemas = await trpcServer.cinemas.myCinemas.query();
  return (
    <div>
      <div>
        {cinemas.length === 0 ? (
          <div>
            You do not have any cinemas yet.
            <br />
            To get your cinema listed contact your respective Admin(s).
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        {cinemas.map((cinemas) => (
          <CinemaInfo key={cinemas.id} cinema={cinemas} />
        ))}
      </div>
    </div>
  );
}
