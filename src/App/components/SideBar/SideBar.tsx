import React from "react";
import styled from "styled-components";
import { PlacesSearch } from "./components";

function SideBar({ ...rest }) {
  return (
    <OuterContainer {...rest}>
      <PlacesSearch />
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export { SideBar };
