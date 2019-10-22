import React from "react";
import moment from "moment";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { useGlobal } from "reactn";

function Filters({ ...rest }) {
  const [currentDate, setCurrentDate] = useGlobal("currentDate");
  return (
    <Container {...rest}>
      <Slider
        value={moment(currentDate).unix()}
        onChange={(event, value) =>
          setCurrentDate(moment.unix(value as number).toISOString())
        }
        step={3600}
        min={startDate}
        max={endDate}
      />
    </Container>
  );
}

const startDate = moment("2019-05-12T10:00:00.000Z").unix();
const endDate = moment("2019-05-13T22:00:00.000Z").unix();

const Container = styled.div`
  padding: 30px;
`;

export { Filters };
