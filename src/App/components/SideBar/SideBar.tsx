import React from "react";
import styled from "styled-components";
import { PlacesSearch, CurrentLocation } from "./components";

type Props = {
  style: React.CSSProperties;
};

function SideBar({ ...rest }: Props) {
  return (
    <OuterContainer {...rest}>
      <PlacesSearch style={{ flex: 0, padding: 8 }} />
      <CurrentLocation style={{ padding: 8 }} />
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
