import React from "react";
import { Area } from "./components";

export interface SuspectData extends google.maps.LatLngLiteral {
  name: string;
  radius: number;
  startTime: string;
  endTime: string;
}

interface Props extends SuspectData {
  zoom: number;
  radius: number;
}
function Suspect(props: Props) {
  return <Area width={10} height={10} />;
}

export { Suspect };
