import React, { useState, useCallback, Fragment } from "react";
import { useGlobal } from "reactn";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Collapse
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

function SavedLocations() {
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
            <ListItem key={i} button>
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
  return (
    <ListSubheader component="div" {...rest}>
      No saved locations yet...
    </ListSubheader>
  );
}

export { SavedLocations };
