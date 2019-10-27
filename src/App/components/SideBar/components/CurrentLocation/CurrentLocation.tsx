import React, { Fragment, useCallback, useMemo } from "react";
import { useGlobal } from "reactn";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from "@material-ui/core";
import styled from "styled-components";

type Props = {
  style?: React.CSSProperties;
};

function CurrentLocation({ ...rest }: Props) {
  const [savedAddresses, setSavedAddresses] = useGlobal("savedAddresses");
  const [searchedAddress] = useGlobal("searchedAddress");

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
    <Fragment>
      <ListItem component="div" {...rest}>
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
      </ListItem>
      <ButtonContainer>
        <Button
          disabled={existingLocation}
          variant="outlined"
          onClick={saveSearchedAddress}
        >
          {existingLocation ? "Saved" : "Save Location"}
        </Button>
      </ButtonContainer>
    </Fragment>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export { CurrentLocation };
