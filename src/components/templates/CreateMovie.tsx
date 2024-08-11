"use client";
import { useFormCreateMovie } from "@/forms/createMovie";
import { Input } from "../atoms/input";
import { Label } from "../atoms/label";
import { Button } from "../atoms/button";
import { Genre } from "@prisma/client";
import { HtmlSelect } from "../atoms/select";
import { trpcClient } from "@/trpc/clients/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { revalidatePath } from "@/utils/actions/revalidatePath";

export interface CreateMovieProps {}

export const CreateMovie = ({}: CreateMovieProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormCreateMovie();

  console.log(errors);
  const { toast } = useToast();
  const router = useRouter();

  const { data, isLoading, mutateAsync } =
    trpcClient.movies.createMovie.useMutation();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        const movie = await mutateAsync(data);
        if (movie) {
          reset();
          toast({ title: `Movie ${data.title} created successfully!` });
          revalidatePath("/admin/movies");
          router.replace("/admin/movies");
        }
      })}
    >
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label title="Title" error={errors.title?.message}>
            <Input placeholder="Title" {...register("title")} />
          </Label>

          <Label title="Director name" error={errors.director?.message}>
            <Input placeholder="Director name" {...register("director")} />
          </Label>

          <Label title="Duration" error={errors.duration?.message}>
            <Input
              placeholder="Duration"
              {...register("duration", { valueAsNumber: true })}
            />
          </Label>

          <Label title="Release date" error={errors.releaseDate?.message}>
            <Input
              placeholder="Release date"
              type="date"
              {...register("releaseDate", {
                setValueAs: (value) => {
                  const date = new Date(value);
                  return isNaN(date.getTime()) ? "" : date.toISOString();
                },
              })}
            />
          </Label>

          <Label title="Genre" error={errors.genre?.message}>
            <HtmlSelect placeholder="projection type" {...register(`genre`)}>
              {Object.values(Genre).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </HtmlSelect>
          </Label>
        </div>

        {/* <Label title="Images" error={errors.posterUrl?.message?.toString()}>
            <ImagePreview
              src={posterUrl || ''}
              clearImage={() => resetField('posterUrl')}
            >
              <Controller
                control={control}
                name={`posterUrl`}
                render={({ field }) => (
                  <Input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => field.onChange(e?.target?.files)}
                  />
                )}
              />
            </ImagePreview>

            {percent > 0 ? <ProgressBar value={percent} /> : null}
          </Label> */}
      </div>
      <Button loading={isLoading} type="submit">
        Submit
      </Button>
    </form>
  );
};
