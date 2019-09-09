import React, { useState, useEffect } from "react";
import { useGlobal } from "reactn";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { Marker } from "./components";

function Map({ ...rest }) {
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(defaultZoom);
  const [currentAddress] = useGlobal("currentAddress");

  useEffect(() => {
    if (currentAddress) {
      setLocation(currentAddress.location);
      setZoom(defaultZoom);
    }
  }, [currentAddress]);

  return (
    <Container {...rest}>
      <GoogleMapReact center={location} zoom={zoom}>
        {currentAddress && <Marker {...currentAddress.location} />}
      </GoogleMapReact>
    </Container>
  );
}

const defaultLocation = {
  lat: 59.95,
  lng: 30.33
};
const defaultZoom = 15;

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export { Map };
