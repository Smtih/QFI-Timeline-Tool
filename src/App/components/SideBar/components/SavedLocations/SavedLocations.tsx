import React, { useCallback } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useGlobal } from "reactn";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
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
        ({ placeId }) => placeIdToRemove !== placeId
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
          <ListItemIcon>
            <img
              src={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
              alt={"Pin Icon"}
            />
          </ListItemIcon>
          <ListItemText
            primary={address.firstLine}
            secondary={address.secondLine}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => deleteAddress(address)}>
              <CloseIcon />
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
  return <Typography>No saved locations yet...</Typography>;
}

export { SavedLocations };
