import React, { useState } from "react";
import { useGlobal } from "reactn";
import styled from "styled-components";
import GoogleMapReact, { ChangeEventValue, Bounds } from "google-map-react";
import { Address, Suspect } from "./components";

interface Props {}

function Map({ ...rest }: Props) {
  const [mapInfo, setMapInfo] = useState(defaultMapInfo);
  const [currentAddress] = useGlobal("currentAddress");
  const [savedAddresses] = useGlobal("savedAddresses");
  const [suspects] = useGlobal("suspects");

  return (
    <Container {...rest}>
      <GoogleMapReact
        center={mapInfo.center}
        zoom={mapInfo.zoom}
        onChange={stuff => {
          setMapInfo(stuff);
        }}
      >
        {savedAddresses.map((address, i) => (
          <Address key={i} {...address} />
        ))}
        {suspects.map((suspect, i) => (
          <Suspect key={i} zoom={mapInfo.zoom} {...suspect} />
        ))}
        {currentAddress && <Address {...currentAddress} />}
      </GoogleMapReact>
    </Container>
  );
}

const defaultBounds: Bounds = {
  nw: { lat: 0, lng: 0 },
  sw: { lat: 0, lng: 0 },
  ne: { lat: 0, lng: 0 },
  se: { lat: 0, lng: 0 }
};

const defaultMapInfo: ChangeEventValue = {
  center: { lat: -37.774376, lng: 144.947494 },
  zoom: 15,
  bounds: defaultBounds,
  marginBounds: defaultBounds,
  size: { width: 0, height: 0 }
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export { Map };
