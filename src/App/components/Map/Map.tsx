import React from "react";
import { useGlobal } from "reactn";
import styled from "styled-components";
import { Map as GoogleMap, Circle, Marker } from "google-maps-react";

interface Props {}

function Map({ ...rest }: Props) {
  const [currentAddress] = useGlobal("currentAddress");
  const [savedAddresses] = useGlobal("savedAddresses");
  const [suspects] = useGlobal("suspects");

  return (
    <Container {...rest} id="map">
      <GoogleMap
        google={google}
        zoom={defaultZoom}
        initialCenter={defaultCenter}
        center={currentAddress ? currentAddress.location : undefined}
      >
        {savedAddresses.map((address, i) => (
          <Marker position={address.location} />
        ))}
        {suspects.map((suspect, i) => (
          <Circle key={i} center={suspect.location} radius={suspect.radius} />
        ))}
        {currentAddress && (
          <Marker
            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            position={currentAddress.location}
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
