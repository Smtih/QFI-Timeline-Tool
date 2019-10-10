import React from "react";
import { Marker } from "./components";

export interface AddressData extends google.maps.LatLngLiteral {
  placeId: string;
  full: string;
  firstLine: string;
  secondLine: string;
}

interface Props extends AddressData {
  color?: string;
}

function Address({ color }: Props) {
  return <Marker color={color} />;
}

export { Address };
