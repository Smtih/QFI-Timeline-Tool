import React from "react";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import {
  PlacesSearch,
  CurrentLocation,
  SavedLocations,
  Suspects
} from "./components";

type Props = {
  style: React.CSSProperties;
};

function SideBar({ ...rest }: Props) {
  return (
    <List component={Card} {...rest}>
      <PlacesSearch />
      <CurrentLocation />
      <SavedLocations />
      <Suspects />
    </List>
  );
}

export { SideBar };
