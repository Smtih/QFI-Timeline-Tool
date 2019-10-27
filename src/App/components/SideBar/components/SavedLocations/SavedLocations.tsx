import React, { useCallback } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useGlobal } from "reactn";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton
} from "@material-ui/core";
import { ExpandableList } from "components";

function SavedLocations() {
  const [, setCurrentPosition] = useGlobal("currentPosition");
  const [savedAddresses, setSavedAddresses] = useGlobal("savedAddresses");

  const deleteAddress = useCallback(
    ({ placeId: placeIdToRemove }) => {
      const remaining = savedAddresses.filter(
        ({ placeId }) => placeIdToRemove != placeId
      );
      setSavedAddresses(remaining);
    },
    [savedAddresses, setSavedAddresses]
  );

  return (
    <ExpandableList
      title="Saved Locations"
      subHeader={<NoLocationsSubheader enabled={savedAddresses.length === 0} />}
    >
      {savedAddresses.map(address => (
        <ListItem
          key={address.placeId}
          button
          onClick={() => setCurrentPosition(address.location)}
        >
          <ListItemText
            primary={address.firstLine}
            secondary={address.secondLine}
          />
          <ListItemIcon>
            <IconButton onClick={() => deleteAddress(address)}>
              <CloseIcon />
            </IconButton>
          </ListItemIcon>
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
