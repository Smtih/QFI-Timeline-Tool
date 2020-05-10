import React, { useMemo, useState } from "react";
import { useGlobal } from "reactn";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  ListItemSecondaryAction,
  Modal
} from "@material-ui/core";
import { SaveLocationModal } from "./components";

type Props = {
  style?: React.CSSProperties;
};

function CurrentLocation({ style }: Props) {
  const [savedAddresses] = useGlobal("savedAddresses");
  const [searchedAddress] = useGlobal("searchedAddress");
  const [, setCurrentPosition] = useGlobal("currentPosition");
  const [isModalOpen, setModalOpen] = useState(false);

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
    <>
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
            onClick={() => setModalOpen(true)}
          >
            Save
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Modal
        style={{
          outline: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        open={isModalOpen}
      >
        <SaveLocationModal closeModal={() => setModalOpen(false)} />
      </Modal>
    </>
  );
}

export { CurrentLocation };
