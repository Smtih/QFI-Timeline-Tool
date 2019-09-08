import React, { useState, useCallback, Fragment } from "react";
import { useGlobal } from "reactn";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Collapse
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

function SavedLocations() {
  const [, setCurrentAddress] = useGlobal("currentAddress");
  const [savedAddresses] = useGlobal("savedAddresses");
  const [open, setOpen] = useState(true);

  const handleClick = useCallback(() => setOpen(!open), [setOpen, open]);

  return (
    <Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Saved Locations" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          subheader={
            <NoLocationsSubheader enabled={savedAddresses.length === 0} />
          }
        >
          {savedAddresses.map((address, i) => (
            <ListItem key={i} button onClick={() => setCurrentAddress(address)}>
              <ListItemText primary={address} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Fragment>
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
