import { RouterOutputs } from "@/trpc/clients/types";
import { AlertBox } from "../molecules/AlertBox";
import Image from "next/image";
import { format } from "date-fns";
import { Title2 } from "../atoms/typography";

export const CinemaInfo = ({
  cinema,
}: {
  cinema: RouterOutputs["cinemas"]["cinemas"][0];
}) => {
  return (
    <div>
      <div className="text-2xl font-semibold">{cinema.name}</div>
      <div className="text-sm text-gray-600 mt-2">
        Screens: {cinema.Screen.length}
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {cinema.Screen.map((screen) => (
          <div key={screen.id}>
            <div className="font-light text-xl ">Screen {screen.number}</div>
            {screen.ShowTime.length === 0 ? (
              <AlertBox className="bg-gray-300 rounded-sm">
                <div className="text-gray-600 text-sm">No shows found.</div>
              </AlertBox>
            ) : null}
            <div className="grid grid-cols-3 gap-2 ">
              {screen.ShowTime.map((showtime) => (
                <div className="p-3 border rounded" key={showtime.id}>
                  <div className="font-semibold text-2xl">
                    {format(showtime.startTime.toString(), "p")}
                  </div>
                  <div className="text-gray-600 text-xs mb-2">
                    {format(showtime.startTime.toString(), "PP")}
                  </div>
                  <Image
                    src={showtime.Movie.posterUrl || "/film.png"}
                    alt=""
                    className="rounded-lg"
                    width={300}
                    height={300}
                  />
                  <Title2 className="mt-2">{showtime.Movie.title}</Title2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
