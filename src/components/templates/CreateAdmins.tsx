"use client";
import { trpcClient } from "@/trpc/clients/client";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { useToast } from "../molecules/Toaster/use-toast";
import { revalidatePath } from "@/utils/actions/revalidatePath";
import { useRouter } from "next/navigation";
import { useFormCreateAdmin } from "@/forms/createAdmin";
import { use, useEffect } from "react";

export const CreateAdmins = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormCreateAdmin();
  const {
    mutateAsync: createAdmin,
    isLoading,
    error,
    data,
  } = trpcClient.admins.create.useMutation();

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast({ title: error.data?.code });
    }
  }, [error, toast]);

  useEffect(() => {
    if (data) {
      reset();
      toast({ title: "Admin created successfully" });
      revalidatePath("/admin/admins");
      router.replace("/admin/admins");
    }
  }, [data, reset, toast]);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await createAdmin(data);
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
