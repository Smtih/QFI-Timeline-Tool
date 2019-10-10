import React, { useState, useEffect } from "react";
import { useGlobal } from "reactn";
import styled from "styled-components";
import { Map as GoogleMap, Circle, Marker } from "google-maps-react";
import { Address, Suspect } from "./components";

interface Props {}

function Map({ ...rest }: Props) {
  const [mapInfo, setMapInfo] = useState(defaultMapInfo);
  const [currentAddress] = useGlobal("currentAddress");
  const [savedAddresses] = useGlobal("savedAddresses");
  const [suspects] = useGlobal("suspects");

  return (
    <Container {...rest} id="map">
      <GoogleMap
        google={google}
        zoom={mapInfo.zoom}
        initialCenter={mapInfo.center}
      >
        {savedAddresses.map((address, i) => (
          <Marker position={address} />
        ))}
        {suspects.map((suspect, i) => (
          <Circle key={i} center={{ ...suspect }} radius={suspect.radius} />
        ))}
        {currentAddress && (
          <Marker
            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            position={{ ...currentAddress }}
          />
        )}
      </GoogleMap>
    </Container>
  );
}

const defaultMapInfo = {
  center: { lat: -37.774376, lng: 144.947494 },
  zoom: 15
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export { Map };
