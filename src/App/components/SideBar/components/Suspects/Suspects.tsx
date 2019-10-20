import React from "react";
import { useGlobal } from "reactn";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { ExpandableList } from "components";

function Suspects() {
  const [suspects] = useGlobal("suspects");
  const [, setCurrentPosition] = useGlobal("currentPosition");

  return (
    <ExpandableList
      title="Suspect Locations"
      subHeader={<NoLocationsSubheader enabled={suspects.length === 0} />}
    >
      {suspects.map((suspect, i) => (
        <ListItem
          key={i}
          button
          onClick={() => setCurrentPosition(suspect.location)}
        >
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
