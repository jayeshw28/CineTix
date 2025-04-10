"use client";
import mapboxgl from "mapbox-gl";
import React from "react";
import MapGl, { Map as MapProps, useMap } from "react-map-gl";

export type ViewState = {
  latitude: number;
  longitude: number;
  zoom?: number;
};

type IMapProps = React.ComponentProps<typeof MapGl> & { height?: string };

export const Map = ({ height = "calc(85vh - 4rem)", ...props }: IMapProps) => {
  return (
    <MapGl
      {...props}
      mapStyle={"mapbox://styles/mapbox/outdoors-v12"}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ height, borderRadius: "12px", overflow: "hidden"  }}
      scrollZoom={false}
      doubleClickZoom={false}
      initialViewState={{ latitude: 22, longitude: 78, zoom: 4.2 }}
    >
      <StyleMap />
      {props.children}
    </MapGl>
  );
};

export const StyleMap = () => {
  const { current: map } = useMap();

  map?.on("style.load", () => {
    map?.getMap().setFog({
      color: "rgb(250,250,250)",
      range: [1, 10],
      "high-color": "rgb(200,200,200)",
      "horizon-blend": 0.05,
      "space-color": "rgb(150, 150, 150)",
      "star-intensity": 0.5,
    });
  });
  return null;
};
