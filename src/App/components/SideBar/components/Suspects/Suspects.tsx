import React, { useCallback } from "react";
import moment from "moment";
import Circle from "@material-ui/icons/LensTwoTone";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useGlobal } from "reactn";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { ExpandableList } from "components";
import { SuspectData } from "reactn/default";

function Suspects() {
  const [suspects, setSuspects] = useGlobal("suspects");
  const [currentDate] = useGlobal("currentDate");
  const [, setCurrentPosition] = useGlobal("currentPosition");
  const eligibleSuspects = suspects.filter(({ startTime, endTime }) =>
    moment(currentDate).isBetween(startTime, endTime, undefined, "[)")
  );
  const toggleVisibility = useCallback(
    (suspect: SuspectData) => {
      const newSuspects = [...suspects];
      const newSuspect = { ...suspect, visible: !suspect.visible };
      const i = suspects.indexOf(suspect);
      newSuspects[i] = newSuspect;
      setSuspects(newSuspects);
    },
    [suspects, setSuspects]
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
            <Circle style={{ color: suspect.color }} fontSize={"large"} />
          </ListItemIcon>
          <ListItemText primary={suspect.name} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => toggleVisibility(suspect)}>
              {suspect.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </ListItemSecondaryAction>
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
