import React from "react";
import moment from "moment";
import styled from "styled-components";
import { useGlobal, useState } from "reactn";
import {
  Map as GoogleMap,
  Circle,
  Marker,
  InfoWindow
} from "google-maps-react";

interface Props {}

interface Info {
  location: google.maps.LatLngLiteral;
  firstLine: string;
  secondLine: string;
}

function Map({ ...rest }: Props) {
  const [currentPosition, setCurrentPosition] = useGlobal("currentPosition");
  const [searchedAddress] = useGlobal("searchedAddress");
  const [savedAddresses] = useGlobal("savedAddresses");
  const [suspects] = useGlobal("suspects");
  const [currentDate] = useGlobal("currentDate");
  const [defaultZoom] = useGlobal("defaultZoom");
  const [defaultCenter] = useGlobal("defaultCenter");

  const [info, setInfo] = useState<Info>();

  const eligibleSuspects = suspects.filter(
    ({ startTime, endTime, visible }) =>
      visible &&
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
        {savedAddresses.map(({ firstLine, secondLine, location }, i) => (
          <Marker
            onClick={() => {
              setInfo({ location, firstLine, secondLine });
            }}
            key={i}
            title={firstLine}
            icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            position={location}
          />
        ))}
        {eligibleSuspects.map(
          ({ location, radius, color, name, startTime, endTime }, i) => (
            <Circle
              onClick={() => {
                setInfo({
                  location,
                  firstLine: name,
                  secondLine: `${startTime} - ${endTime}`
                });
              }}
              key={i}
              center={location}
              radius={radius}
              fillColor={color}
              strokeColor={color}
            />
          )
        )}
        {searchedAddress && (
          <Marker
            onClick={() => {
              setInfo(searchedAddress);
            }}
            title={searchedAddress.firstLine}
            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            position={searchedAddress.location}
          />
        )}
        <InfoWindow
          visible={!!info}
          position={info?.location}
          onClose={() => setInfo(undefined)}
        >
          <div>
            <p>{info?.firstLine}</p>
            <p>{info?.secondLine}</p>
          </div>
        </InfoWindow>
      </GoogleMap>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export { Map };
