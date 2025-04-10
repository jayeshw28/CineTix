import { TellThem } from "@/components/molecules/TellThem";
import { AdminMenu } from "@/components/organisms/AdminMenu";
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
  const adminMe = await trpcServer.admins.adminMe.query();
  if (!adminMe?.id) {
    return <TellThem role={"admin"} uid={`${userId}`} />;
  }

  return (
    <div className="flex mt-2 ">
      <div className="hidden w-full max-w-xs min-w-min sm:block">
        <AdminMenu />
      </div>

      <div className="flex-grow ">
        <div className="sm:hidden">
          <SimpleSidebar>
            <AdminMenu />
          </SimpleSidebar>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg border-4 border-[#B9C3AF]">
          {children}
        </div>
      </div>
    </div>
  );
}
