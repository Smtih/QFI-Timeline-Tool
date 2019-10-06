import React from "react";
import styled from "styled-components";

interface Props {
  color: string;
  width: number;
  height: number;
}

function Circle({ color, width, height, ...rest }: Props) {
  return (
    <Container {...rest}>
      <svg
        style={{ width, height }}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle fill={color} cx="50" cy="50" r="50" />
      </svg>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 0;
`;

export { Circle };
