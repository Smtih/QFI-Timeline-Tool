import React, { useCallback, FC, useState } from "react";
import { useGlobal } from "reactn";
import { Container, TextField, Paper, Button } from "@material-ui/core";
import styled from "styled-components";

interface Props {
  closeModal: () => void;
}

const SaveLocationModal: FC<Props> = ({ closeModal }) => {
  const [savedAddresses, setSavedAddresses] = useGlobal("savedAddresses");
  const [searchedAddress] = useGlobal("searchedAddress");
  const [locationName, setLocationName] = useState(
    searchedAddress?.firstLine || ""
  );

  const saveSearchedAddress = useCallback(() => {
    const formattedLocation = locationName.trim();
    if (!formattedLocation || !searchedAddress) return;
    const addresses = [
      ...savedAddresses,
      { ...searchedAddress, firstLine: formattedLocation }
    ];
    setSavedAddresses(addresses);
    closeModal();
  }, [
    locationName,
    searchedAddress,
    savedAddresses,
    setSavedAddresses,
    closeModal
  ]);

  return (
    <StyledContainer>
      <StyledPaper>
        <TextField
          onFocus={event => {
            event.target.select();
          }}
          autoFocus
          value={locationName}
          onChange={event => {
            setLocationName(event.target.value);
          }}
          label={"Location Name"}
          defaultValue={locationName}
        />
        <Button
          style={{ marginTop: 8 }}
          disabled={!locationName.trim()}
          variant="outlined"
          onClick={saveSearchedAddress}
        >
          Save
        </Button>
      </StyledPaper>
    </StyledContainer>
  );
};

const StyledPaper = styled(Paper)`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-content: center;
`;

export { SaveLocationModal };
