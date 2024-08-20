"use client";
import { trpcClient } from "@/trpc/clients/client";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { useToast } from "../molecules/Toaster/use-toast";
import { revalidatePath } from "@/utils/actions/revalidatePath";
import { useRouter } from "next/navigation";
import { useFormCreateManager } from "@/forms/createManager";

export const CreateManagers = () => {
  const { register, handleSubmit, reset } = useFormCreateManager();
  const { mutateAsync: createManager, isLoading } =
    trpcClient.managers.create.useMutation();

  const { toast } = useToast();
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const manager = await createManager(data);
        if (manager) {
          reset();
          toast({ title: "Manager created successfully" });
          revalidatePath("/admin/managers");
          router.replace("/admin/managers");
        } else {
          toast({ title: "Manager creation failed" });
        }
      })}
    >
      <Label title="UID">
        <Input placeholder="Enter the uid" {...register("id")} />
      </Label>
      <Button type="submit" loading={isLoading}>
        Submit
      </Button>
    </form>
  );
};
