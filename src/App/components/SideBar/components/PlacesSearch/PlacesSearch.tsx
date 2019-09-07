import React, { useState, useCallback } from "react";
import { useGlobal } from "reactn";
import { ListItem } from "@material-ui/core";
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
    <ListItem component="div" {...rest}>
      <PlacesAutocomplete
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
            <SelectContainer>
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
            </SelectContainer>
          );
        }}
      </PlacesAutocomplete>
    </ListItem>
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

const SelectContainer = styled.div`
  width: 100%;
`;

export { PlacesSearch };
