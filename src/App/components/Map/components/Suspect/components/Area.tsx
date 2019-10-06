import React from "react";
import styled from "styled-components";
import { Circle } from "svg";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

function Area({
  color = "rgba(0, 0, 0, 0.5)",
  width = 25,
  height = 25
}: Props) {
  return <StyledCircle color={color} width={width} height={height} />;
}

interface SizeProps {
  height: number;
  width: number;
}
const StyledCircle = styled(Circle)<SizeProps>`
  display: flex;
  flex: 0;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  margin-left: ${({ width }) => -width / 2}px;
  margin-top: ${({ height }) => -height / 2}px;
`;

export { Area };
