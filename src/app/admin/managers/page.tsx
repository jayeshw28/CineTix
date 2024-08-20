import { CreateManagers } from "@/components/templates/CreateManagers";
import { ListManagers } from "@/components/templates/ListManagers";
import { List } from "lucide-react";

export default async function Page() {
  return (
    <div>
      <div>Manage Manager</div>
      <CreateManagers />
      <ListManagers />
    </div>
  );
}
