import { TellThem } from "@/components/molecules/TellThem";
import { ManagerMenu } from "@/components/organisms/ManagerMenu";
import { SimpleSidebar } from "@/components/molecules/SimpleSidebar";
import { trpcServer } from "@/trpc/clients/server";
import { auth } from "@clerk/nextjs/server";
import { Link } from "lucide-react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    return <Link href="/sign-in">Sign-In</Link>;
  }
  const managerMe = await trpcServer.managers.managerMe.query();
  if (!managerMe?.id) {
    return <TellThem role={"manager"} uid={`${userId}`} />;
  }

  return (
    <div className="flex mt-2 ">
      <div className="hidden w-full max-w-xs min-w-min sm:block">
        <ManagerMenu />
      </div>

      <div className="flex-grow ">
        <div className="sm:hidden">
          <SimpleSidebar>
            <ManagerMenu />
          </SimpleSidebar>
        </div>
        <div className="p-4 bg-gray-100">{children}</div>
      </div>
    </div>
  );
}
