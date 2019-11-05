import React from "react";
import moment from "moment";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { useGlobal } from "reactn";
import { Typography } from "@material-ui/core";

function Filters({ ...rest }) {
  const [currentDate, setCurrentDate] = useGlobal("currentDate");
  const unixDate = moment(currentDate).unix();
  return (
    <Container {...rest}>
      <Row>
        <Typography>{formatDate(unixDate)}</Typography>
      </Row>
      <Row>
        <Typography style={{ paddingRight: 16, textAlign: "right" }}>
          {formatDate(startDate)}
        </Typography>
        <Slider
          value={unixDate}
          onChange={(event, value) =>
            setCurrentDate(moment.unix(value as number).toISOString())
          }
          step={1800}
          min={startDate}
          max={endDate}
        />
        <Typography style={{ paddingLeft: 16, textAlign: "left" }}>
          {formatDate(endDate)}
        </Typography>
      </Row>
    </Container>
  );
}

function formatDate(date: number): string {
  return moment.unix(date).format("DD/MM/YYYY hh:mm a");
}

const startDate = moment("2019-05-12T06:00:00.000+10").unix();
const endDate = moment("2019-05-14T22:00:00.000+10").unix();

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
