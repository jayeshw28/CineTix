import { trpcServer } from "@/trpc/clients/server";
import { Title2 } from "../atoms/typography";
import { UserCard } from "../organisms/UserCard";

export const ListAdmins = async () => {
  const admins = await trpcServer.admins.findAll.query();
  return (
    <div className="mt-6">
      <Title2>Admins</Title2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-3">
        {admins?.map(({ User: { id, image, name } }) => (
          <UserCard key={id} user={{ id, image, name }} />
        ))}
      </div>
    </div>
  );
};
