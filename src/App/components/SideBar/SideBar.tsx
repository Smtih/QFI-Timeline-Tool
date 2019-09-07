import React from "react";
import styled from "styled-components";
import { PlacesSearch, CurrentLocation, SavedLocations } from "./components";

type Props = {
  style: React.CSSProperties;
};

function SideBar({ ...rest }: Props) {
  return (
    <OuterContainer {...rest}>
      <PlacesSearch style={{ flex: 0, padding: 8 }} />
      <CurrentLocation style={{ flex: 0, padding: 8 }} />
      <SavedLocations />
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-right: 1px solid gray;
`;

export { SideBar };
