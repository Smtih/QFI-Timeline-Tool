import React from "react";
import moment from "moment";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { useGlobal } from "reactn";
import { Typography } from "@material-ui/core";

function Filters({ ...rest }) {
  const [currentDate, setCurrentDate] = useGlobal("currentDate");
  const [startDate] = useGlobal("startDate");
  const [endDate] = useGlobal("endDate");
  const [interval] = useGlobal("intervalMinutes");

  return (
    <Container {...rest}>
      <Row>
        <Typography>{formatDate(currentDate)}</Typography>
      </Row>
      <Row>
        <Typography style={{ paddingRight: 16, textAlign: "right" }}>
          {formatDate(startDate)}
        </Typography>
        <Slider
          value={moment(currentDate).unix()}
          onChange={(event, value) =>
            setCurrentDate(moment.unix(value as number).toISOString())
          }
          step={interval * 60}
          min={moment(startDate).unix()}
          max={moment(endDate).unix()}
        />
        <Typography style={{ paddingLeft: 16, textAlign: "left" }}>
          {formatDate(endDate)}
        </Typography>
      </Row>
    </Container>
  );
}

export function formatDate(date: string): string {
  return moment(date).format("DD/MM/YYYY hh:mm a");
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: 16px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
`;

export { Filters };
