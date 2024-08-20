import { CreateAdmins } from "@/components/templates/CreateAdmins";
import { ListAdmins } from "@/components/templates/ListAdmins";

export default async function Page() {
  return (
    <div>
      <div>Manage Admins</div>
      <CreateAdmins />
      <ListAdmins />
    </div>
  );
}
