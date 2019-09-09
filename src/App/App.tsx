import React from "react";
import styled from "styled-components";
import { SideBar, Map, Filters } from "./components";
import { Persist } from "./utils";

const defaultGlobal = {
  currentAddress: null,
  savedAddresses: []
};

const persist = new Persist(defaultGlobal, 12 * 60 * 60 * 1000);
persist.initialise();

function App({ ...rest }) {
  return (
    <OuterContainer {...rest}>
      <SideBar style={{ flex: "1 1 100px" }} />
      <ColumnContainer style={{ flex: "5 5 0" }}>
        <Map />
        <Filters />
      </ColumnContainer>
    </OuterContainer>
  );
}

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const OuterContainer = styled(ColumnContainer)`
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

export { App };
