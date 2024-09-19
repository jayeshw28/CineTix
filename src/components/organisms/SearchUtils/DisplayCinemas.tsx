"use client";
import { trpcClient } from "@/trpc/clients/client";
import { useEffect, useMemo, useState } from "react";
import { LngLatBounds, useMap } from "react-map-gl";
import { MarkerCinema } from "./MarkerCinema";
import { MovieDialog } from "./MovieDialogue";

export const DisplayCinemas = () => {
  const { current: map } = useMap();

  const [bounds, setBounds] = useState<LngLatBounds>();
  useEffect(() => {
    const handleBounds = () => {
      const bounds = map?.getBounds();
      if (bounds) {
        setBounds(bounds);
      }
    };
    map?.on("load", handleBounds);
    map?.on("dragend", handleBounds);
    map?.on("zoomend", handleBounds);
  }, [map]);

  const locationFilter = useMemo(
    () => ({
      ne_lat: bounds?.getNorthEast().lat || 0,
      ne_lng: bounds?.getNorthEast().lng || 0,
      sw_lat: bounds?.getSouthWest().lat || 0,
      sw_lng: bounds?.getSouthWest().lng || 0,
    }),
    [bounds],
  );

  const { data, refetch } = trpcClient.cinemas.SearchCinemas.useQuery({
    locationFilter,
  });

  console.log("data", data);

  useEffect(() => {
    refetch();
  }, [bounds, refetch]);

  return (
    <div>
      <MovieDialog />

      {data?.map((cinema) => <MarkerCinema key={cinema.id} cinema={cinema} />)}
    </div>
  );
};
