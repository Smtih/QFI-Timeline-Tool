import React from "react";
import { ChildComponentProps, Coords } from "google-map-react";
import { Marker } from "./components";

export interface AddressData extends Coords {
  placeId: string;
  full: string;
  firstLine: string;
  secondLine: string;
}

interface Props extends AddressData, ChildComponentProps {
  color?: string;
}

function Address({ color }: Props) {
  return <Marker color={color} />;
}

export { Address };
