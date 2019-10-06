import React from "react";
import styled from "styled-components";
import { Pin } from "svg";

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

function Marker({ color = "red", width = 25, height = 25 }: Props) {
  return <StyledPin color={color} width={width} height={height} />;
}

interface SizeProps {
  height: number;
  width: number;
}
const StyledPin = styled(Pin)<SizeProps>`
  display: flex;
  flex: 0;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  margin-left: ${({ width }) => -width / 2}px;
  margin-top: ${({ height }) => -height}px;
`;

export { Marker };
