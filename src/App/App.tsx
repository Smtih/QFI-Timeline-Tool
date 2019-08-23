import React from "react";
import styled from "styled-components";
import { SideBar, Map, Filters } from "./components";
import initReactnPersist from "reactn-persist";

initReactnPersist({
  storage: localStorage
});

function App({ ...rest }) {
  return (
    <OuterContainer {...rest}>
      <SideBar style={{ flex: "0 0 200px" }} />
      <ColumnContainer>
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
