import React, { useState, useEffect } from "react";
import { useGlobal } from "reactn";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Marker } from "./components";

function Map({ ...rest }) {
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(defaultZoom);
  const [currentAddress] = useGlobal("currentAddress");

  useEffect(() => {
    if (currentAddress) {
      geocodeByAddress(currentAddress)
        .then(results => getLatLng(results[0]))
        .then(location => {
          setLocation(location);
          setZoom(defaultZoom);
        })
        .catch(error => console.error("Error", error));
    }
  }, [currentAddress]);

  return (
    <Container {...rest}>
      <GoogleMapReact center={location} zoom={zoom}>
        {currentAddress && (
          <Marker
            lat={location.lat}
            lng={location.lng}
            width={20}
            height={20}
          />
        )}
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
