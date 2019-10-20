import React from "react";
import { useGlobal } from "reactn";
import styled from "styled-components";
import { Map as GoogleMap, Circle, Marker } from "google-maps-react";

interface Props {}

function Map({ ...rest }: Props) {
  const [currentPosition, setCurrentPosition] = useGlobal("currentPosition");
  const [searchedAddress] = useGlobal("searchedAddress");
  const [savedAddresses] = useGlobal("savedAddresses");
  const [suspects] = useGlobal("suspects");

  return (
    <Container
      style={{ width: "100%", height: "100%", position: "relative" }}
      {...rest}
    >
      <GoogleMap
        style={{ width: "100%", height: "100%", position: "relative" }}
        google={google}
        zoom={defaultZoom}
        initialCenter={defaultCenter}
        center={currentPosition}
        onDragend={() => setCurrentPosition(undefined)}
      >
        {savedAddresses.map((address, i) => (
          <Marker
            title={address.firstLine}
            icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            position={address.location}
          />
        ))}
        {suspects.map((suspect, i) => (
          <Circle key={i} center={suspect.location} radius={suspect.radius} />
        ))}
        {searchedAddress && (
          <Marker
            title={searchedAddress.firstLine}
            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            position={searchedAddress.location}
          />
        )}
      </GoogleMap>
    </Container>
  );
}

const defaultCenter = { lat: -37.774376, lng: 144.947494 };
const defaultZoom = 15;

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export { Map };
