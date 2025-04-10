import { SimpleSidebar } from "@/components/molecules/SimpleSidebar";
import { UserMenu } from "@/components/organisms/UserMenu";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex mt-2 ">
      <div className="hidden w-full max-w-xs min-w-min sm:block">
        <UserMenu />
      </div>

      <div className="flex-grow ">
        <div className="sm:hidden">
          <SimpleSidebar>
            <UserMenu />
          </SimpleSidebar>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg border-4 border-[#B9C3AF]">
          {children}
        </div>
      </div>
    </div>
  );
}
