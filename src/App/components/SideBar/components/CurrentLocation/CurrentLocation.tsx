import React, { Fragment, useCallback, useMemo } from "react";
import { useGlobal } from "reactn";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  ListItemSecondaryAction
} from "@material-ui/core";
import styled from "styled-components";

type Props = {
  style?: React.CSSProperties;
};

function CurrentLocation({ style }: Props) {
  const [savedAddresses, setSavedAddresses] = useGlobal("savedAddresses");
  const [searchedAddress] = useGlobal("searchedAddress");
  const [, setCurrentPosition] = useGlobal("currentPosition");

  const saveSearchedAddress = useCallback(() => {
    const addresses = [...savedAddresses];
    if (searchedAddress) {
      addresses.push(searchedAddress);
    }
    setSavedAddresses(addresses);
  }, [savedAddresses, setSavedAddresses, searchedAddress]);

  const existingLocation = useMemo(
    () =>
      !!searchedAddress &&
      !!savedAddresses.find(
        address => address.placeId === searchedAddress.placeId
      ),
    [savedAddresses, searchedAddress]
  );

  if (!searchedAddress) {
    return null;
  }

  return (
    <ListItem
      button
      onClick={() => setCurrentPosition(searchedAddress.location)}
    >
      <ListItemIcon>
        <img
          src={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
          alt={"Pin Icon"}
        />
      </ListItemIcon>
      <ListItemText
        primary={searchedAddress.firstLine}
        secondary={searchedAddress.secondLine}
      ></ListItemText>
      <ListItemSecondaryAction>
        <Button
          disabled={existingLocation}
          variant="outlined"
          onClick={saveSearchedAddress}
        >
          Save
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export { CurrentLocation };
