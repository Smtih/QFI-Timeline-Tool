import React from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { googleMapApiKey } from "../../../env";

function Map({ ...rest }) {
  return (
    <Container {...rest}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapApiKey }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33
        }}
        defaultZoom={11}
      ></GoogleMapReact>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export { Map };
