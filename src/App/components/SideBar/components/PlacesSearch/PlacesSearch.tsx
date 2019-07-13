import React, { useState } from "react";
import styled from "styled-components";
import PlacesAutocomplete from "react-places-autocomplete";
import Select from "react-select";

type Props = { handleAddressSelected: (address: string) => void };
type State = { address: string };

function PlacesSearch({ handleAddressSelected, ...rest }: Props) {
  const [address, setAddress] = useState("");

  function handleChange(address: string) {
    if (address) {
      setAddress(address);
    }
  }

  function handleSelect(address: string) {
    handleChange(address);
    handleAddressSelected(address);
  }

  return (
    <StyledPlacesAutocomplete
      debounce={500}
      value={address}
      onChange={handleChange}
      searchOptions={searchOptions}
      {...rest}
    >
      {({ getInputProps, suggestions }) => {
        const { onChange } = getInputProps();

        const options = suggestions.map((suggestion, i) => ({
          value: String(i),
          label: suggestion.description
        }));

        return (
          <Select
            menuIsOpen={options.length > 0}
            filterOption={() => true}
            onInputChange={value => onChange({ target: { value } })}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null
            }}
            placeholder={"Search"}
            options={options}
            onChange={(value: any) => {
              handleSelect(value.label);
            }}
          />
        );
      }}
    </StyledPlacesAutocomplete>
  );
}

const google = (window as any).google;
const searchOptions = {
  location: new google.maps.LatLng(-37, 144),
  radius: 5000,
  componentRestrictions: {
    country: "AU"
  }
};

const StyledPlacesAutocomplete = styled(PlacesAutocomplete)`
  display: flex;
  flex: 1;
`;

export { PlacesSearch };
