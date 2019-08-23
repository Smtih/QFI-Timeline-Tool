import React from "react";
import styled from "styled-components";
import { useGlobal } from "reactn";
import { Pin } from "svg";

type Props = {
  style?: React.CSSProperties;
};

function CurrentLocation({ ...rest }: Props) {
  const [currentAddress] = useGlobal("currentAddress");

  return (
    <OuterContainer {...rest}>
      <Pin color={"red"} width={20} height={20} />
      {currentAddress}
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export { CurrentLocation };
