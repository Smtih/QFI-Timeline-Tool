import React from "react";
import styled from "styled-components";

interface Props {
  color: string;
  width: number;
  height: number;
}

function Pin({ color, width, height, ...rest }: Props) {
  return (
    <Container {...rest}>
      <svg style={{ width, height }} viewBox="0 0 24 24">
        <path
          fill={color}
          d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
        />
      </svg>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 0;
`;

export { Pin };
