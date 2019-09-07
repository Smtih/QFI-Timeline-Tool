import React, { Fragment, useCallback } from "react";
import { useGlobal } from "reactn";
import { Pin } from "svg";
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
  const [currentAddress] = useGlobal("currentAddress");

  const saveCurrentAddress = useCallback(() => {
    setSavedAddresses([...savedAddresses, currentAddress]);
  }, [savedAddresses, setSavedAddresses, currentAddress]);

  if (!currentAddress) {
    return null;
  }

  return (
    <Fragment>
      <ListItem component="div" {...rest}>
        <ListItemIcon>
          <Pin width={30} height={30} color="red" />
        </ListItemIcon>
        <ListItemText>{currentAddress}</ListItemText>
      </ListItem>
      <ButtonContainer>
        <Button
          disabled={savedAddresses.includes(currentAddress)}
          variant="outlined"
          onClick={saveCurrentAddress}
        >
          Save Location
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
