import React from "react";
import moment from "moment";
import styled from "styled-components";
import { useGlobal } from "reactn";
import { Map as GoogleMap, Circle, Marker } from "google-maps-react";

interface Props {}

function Map({ ...rest }: Props) {
  const [currentPosition, setCurrentPosition] = useGlobal("currentPosition");
  const [searchedAddress] = useGlobal("searchedAddress");
  const [savedAddresses] = useGlobal("savedAddresses");
  const [suspects] = useGlobal("suspects");
  const [currentDate] = useGlobal("currentDate");
  const eligibleSuspects = suspects.filter(({ startTime, endTime }) =>
    moment(currentDate).isBetween(startTime, endTime, undefined, "[)")
  );

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
        {savedAddresses.map(({ firstLine, location }, i) => (
          <Marker
            title={firstLine}
            icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            position={location}
          />
        ))}
        {eligibleSuspects.map(({ location, radius, color }, i) => (
          <Circle
            key={i}
            center={location}
            radius={radius}
            fillColor={color}
            strokeColor={color}
          />
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
