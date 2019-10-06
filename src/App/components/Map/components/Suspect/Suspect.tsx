import React from "react";
import { ChildComponentProps, Coords } from "google-map-react";
import { meters2ScreenPixels } from "google-map-react/utils";
import { Area } from "./components";

export interface SuspectData extends Coords {
  name: string;
  radius: number;
  startTime: string;
  endTime: string;
}

interface Props extends SuspectData, ChildComponentProps {
  zoom: number;
  radius: number;
}
function Suspect({ radius, lat, lng, zoom }: Props) {
  const { w, h } = meters2ScreenPixels(radius * 2, { lat, lng }, zoom);
  return <Area width={w} height={h} />;
}

export { Suspect };
