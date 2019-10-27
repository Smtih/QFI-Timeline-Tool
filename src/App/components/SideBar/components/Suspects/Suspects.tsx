import React from "react";
import moment from "moment";
import Circle from "@material-ui/icons/LensTwoTone";
import { useGlobal } from "reactn";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import { ExpandableList } from "components";

function Suspects() {
  const [suspects] = useGlobal("suspects");
  const [currentDate] = useGlobal("currentDate");
  const [, setCurrentPosition] = useGlobal("currentPosition");
  const eligibleSuspects = suspects.filter(({ startTime, endTime }) =>
    moment(currentDate).isBetween(startTime, endTime, undefined, "[)")
  );
  return (
    <ExpandableList
      title="Suspect Locations"
      subHeader={<NoLocationsSubheader enabled={suspects.length === 0} />}
    >
      {eligibleSuspects.map((suspect, i) => (
        <ListItem
          key={i}
          button
          onClick={() => setCurrentPosition(suspect.location)}
        >
          <ListItemIcon>
            <Circle fontSize={"large"} />
          </ListItemIcon>
          <ListItemText primary={suspect.name} />
        </ListItem>
      ))}
    </ExpandableList>
  );
}

interface Props {
  enabled: boolean;
}
function NoLocationsSubheader({ enabled, ...rest }: Props) {
  if (!enabled) {
    return null;
  }
  return <Typography>No suspects found</Typography>;
}

export { Suspects };
