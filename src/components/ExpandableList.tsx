import React, {
  useState,
  useCallback,
  Fragment,
  FunctionComponent
} from "react";
import { List, ListItem, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

interface Props {
  title: string;
  subHeader: React.ReactElement;
}

const ExpandableList: FunctionComponent<Props> = ({
  title,
  subHeader,
  children
}) => {
  const [open, setOpen] = useState(true);
  const handleClick = useCallback(() => setOpen(!open), [setOpen, open]);

  return (
    <Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding subheader={subHeader}>
          {children}
        </List>
      </Collapse>
    </Fragment>
  );
};

export { ExpandableList };
