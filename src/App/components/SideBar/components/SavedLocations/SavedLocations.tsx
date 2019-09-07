import React, { useState, useCallback } from "react";
import { useGlobal } from "reactn";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

function SavedLocations() {
  const [savedAddresses] = useGlobal("savedAddresses");
  const [open, setOpen] = useState(true);

  const handleClick = useCallback(() => setOpen(!open), [setOpen, open]);

  return (
    <List component="div" aria-labelledby="sidebar-list">
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Saved Locations" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {savedAddresses.map((address, i) => (
            <ListItem key={i} button>
              <ListItemText primary={address} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export { SavedLocations };
