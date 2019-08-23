import React, { useState, useCallback } from "react";
import { useGlobal } from "reactn";
import styled from "styled-components";
import PlacesAutocomplete from "react-places-autocomplete";
import Select from "react-select";

type Props = {
  style?: React.CSSProperties;
};

function PlacesSearch({ ...rest }: Props) {
  const [searchString, setSearchString] = useState("");
  const [, setCurrentAddress] = useGlobal("currentAddress");

  const handleChange = useCallback(
    (searchString: string) => {
      if (searchString) {
        setSearchString(searchString);
      }
    },
    [setSearchString]
  );

  const handleSelect = useCallback(
    (address: string) => {
      handleChange(address);
      setCurrentAddress(address);
    },
    [handleChange, setCurrentAddress]
  );

  return (
    <OuterContainer {...rest}>
      <StyledPlacesAutocomplete
        debounce={500}
        value={searchString}
        onChange={handleChange}
        searchOptions={searchOptions}
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
    </OuterContainer>
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

const OuterContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export { PlacesSearch };
