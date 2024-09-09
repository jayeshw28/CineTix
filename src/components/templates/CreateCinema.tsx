import { FormTypeCreateCinema } from "@/forms/createCinema";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { TextArea } from "../atoms/textArea";
import { trpcClient } from "@/trpc/clients/client";
import { useToast } from "../molecules/Toaster/use-toast";
import { revalidatePath } from "@/utils/actions/revalidatePath";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { SimpleAccordion } from "../molecules/simpleAccordion";
import { HtmlSelect } from "../atoms/select";
import { ProjectionType, SoundSystemType } from "@prisma/client";
import { Grid, Square } from "../organisms/ScreenUtils";
import { watch } from "fs/promises";

export const CreateCinema = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormTypeCreateCinema>();
  const { mutateAsync: createCinema, isLoading } =
    trpcClient.cinemas.createCinema.useMutation();

  const formData = watch();
  console.log("errors", errors);
  console.log("formData", formData);

  const { toast } = useToast();
  const router = useRouter();
  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log("Form submission data:", data);
          const cinema = await createCinema(data);

          if (cinema) {
            reset();
            toast({ title: "Cinema created successfully" });
            revalidatePath("/admin/cinemas");
            router.replace("/admin/cinemas");
          }
        })}
      >
        <Label title="Cinema" error={errors.cinemaName?.message}>
          <Input placeholder="Cinema name" {...register("cinemaName")} />
        </Label>
        <Label title="Manager ID" error={errors.managerId?.message}>
          <Input placeholder="Manager ID" {...register("managerId")} />
        </Label>
        <Label title="Address" error={errors.address?.address?.message}>
          <TextArea placeholder="Address" {...register("address.address")} />
        </Label>
        {/* <Label title="Location">
                    <ShowLocation />
                </Label> */}
        <AddScreens />
        <div className="my-4">
          <Button
            variant="link"
            size={"sm"}
            className="text-xs text-gray-600 underline underline-offset-2"
            onClick={() => {
              reset();
            }}
          >
            Reset form
          </Button>
        </div>
        <Button type="submit" loading={isLoading}>
          Create cinema
        </Button>
      </form>
    </div>
  );
};

const AddScreens = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormTypeCreateCinema>();

  const { append, remove, fields } = useFieldArray({
    control,
    name: "screens",
  });

  const { screens } = useWatch<FormTypeCreateCinema>();
  return (
    <div>
      {fields.map((item, screenIndex) => {
        return (
          <SimpleAccordion title={screenIndex + 1 || "[Empty]"} key={item.id}>
            <div className={"flex justify-end w-full my-2"}>
              <Button
                variant="link"
                size={"sm"}
                className="text-xs text-gray-600 underline underline-offset-2"
                onClick={() => {
                  remove(screenIndex);
                }}
              >
                remove screen
              </Button>
            </div>
            <div className={`flex flex-col gap-2`}>
              <div className="grid grid-cols-2 gap-2">
                <Label
                  title="Projection type"
                  error={errors.screens?.[screenIndex]?.type?.toString()}
                >
                  <HtmlSelect
                    placeholder="projection type"
                    {...register(`screens.${screenIndex}.ProjectionType`)}
                  >
                    {Object.values(ProjectionType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </HtmlSelect>
                </Label>
                <Label
                  title="Sound system type"
                  error={errors.screens?.[screenIndex]?.type?.toString()}
                >
                  <HtmlSelect
                    placeholder="sound system type"
                    {...register(`screens.${screenIndex}.SoundSystemType`)}
                  >
                    {Object.values(SoundSystemType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </HtmlSelect>
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Label
                  title="Rows"
                  error={errors.screens?.[screenIndex]?.rows?.message}
                >
                  <Input
                    placeholder="Enter the name"
                    {...register(`screens.${screenIndex}.rows`, {
                      valueAsNumber: true,
                    })}
                  />
                </Label>
                <Label
                  title="Columns"
                  error={errors.screens?.[screenIndex]?.columns?.message}
                >
                  <Input
                    type="number"
                    placeholder="Enter the name"
                    {...register(`screens.${screenIndex}.columns`, {
                      valueAsNumber: true,
                    })}
                  />
                </Label>
                <Label
                  title="Price"
                  error={errors.screens?.[screenIndex]?.price?.message}
                >
                  <Input
                    type="number"
                    placeholder="Enter the price"
                    {...register(`screens.${screenIndex}.price`, {
                      valueAsNumber: true,
                    })}
                  />
                </Label>
              </div>
              <Grid
                rows={screens?.[screenIndex]?.rows || 0}
                columns={screens?.[screenIndex]?.columns || 0}
              />
            </div>
          </SimpleAccordion>
        );
      })}
      <div className={"flex justify-end my-2"}>
        <Button
          type="button" // Add this line
          variant="link"
          size={"sm"}
          className="text-xs text-gray-600 underline underline-offset-2"
          onClick={(e) => {
            // Modify this line
            e.preventDefault(); // Add this line
            append({
              columns: 0,
              rows: 0,
              price: 0,
              ProjectionType: ProjectionType.STANDARD,
              SoundSystemType: SoundSystemType.DOLBY_ATMOS,
            });
          }}
        >
          <Plus className="w-4 h-4" /> add screen
        </Button>
      </div>
    </div>
  );
};
