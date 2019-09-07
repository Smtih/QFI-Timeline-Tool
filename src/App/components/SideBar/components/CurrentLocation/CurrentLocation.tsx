import React from "react";
import { useGlobal } from "reactn";
import { Pin } from "svg";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

type Props = {
  style?: React.CSSProperties;
};

function CurrentLocation({ ...rest }: Props) {
  const [currentAddress] = useGlobal("currentAddress");

  if (!currentAddress) {
    return null;
  }

  return (
    <ListItem component="div" {...rest}>
      <ListItemIcon>
        <Pin width={30} height={30} color="red" />
      </ListItemIcon>
      <ListItemText>{currentAddress}</ListItemText>
    </ListItem>
  );
}

export { CurrentLocation };
