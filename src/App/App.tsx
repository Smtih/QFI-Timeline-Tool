import React from "react";
import styled from "styled-components";
import initReactnPersist from "reactn-persist";
import { setGlobal } from "reactn";
import { SideBar, Map, Filters } from "./components";

setGlobal({
  currentAddress: null,
  savedAddresses: []
});

initReactnPersist({
  storage: localStorage
});

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
