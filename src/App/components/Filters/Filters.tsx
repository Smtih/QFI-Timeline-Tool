import React from "react";
import moment from "moment";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { useGlobal } from "reactn";
import { Typography } from "@material-ui/core";

function Filters({ ...rest }) {
  const [currentDate, setCurrentDate] = useGlobal("currentDate");
  return (
    <Container {...rest}>
      <Typography style={{ paddingRight: 16, textAlign: "right" }}>
        {formatDate(startDate)}
      </Typography>
      <Slider
        value={moment(currentDate).unix()}
        onChange={(event, value) =>
          setCurrentDate(moment.unix(value as number).toISOString())
        }
        step={3600}
        min={startDate}
        max={endDate}
      />
      <Typography style={{ paddingLeft: 16, textAlign: "left" }}>
        {formatDate(endDate)}
      </Typography>
    </Container>
  );
}

function formatDate(date: number): string {
  return moment.unix(date).format("DD/MM/YYYY hh:mma");
}

const startDate = moment("2019-05-12T10:00:00.000Z").unix();
const endDate = moment("2019-05-13T22:00:00.000Z").unix();

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
`;

export { Filters };
