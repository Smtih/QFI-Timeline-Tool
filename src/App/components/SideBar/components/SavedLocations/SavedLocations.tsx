import React from "react";
import { useGlobal } from "reactn";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { ExpandableList } from "components";

function SavedLocations() {
  const [, setCurrentAddress] = useGlobal("currentAddress");
  const [savedAddresses] = useGlobal("savedAddresses");

  return (
    <ExpandableList
      title="Saved Locations"
      subHeader={<NoLocationsSubheader enabled={savedAddresses.length === 0} />}
    >
      {savedAddresses.map(address => (
        <ListItem
          key={address.placeId}
          button
          onClick={() => setCurrentAddress(address)}
        >
          <ListItemText
            primary={address.firstLine}
            secondary={address.secondLine}
          />
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
  return <Typography>No saved locations yet...</Typography>;
}

export { SavedLocations };
