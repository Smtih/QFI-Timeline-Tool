import React, { useState, useCallback } from "react";
import { useGlobal } from "reactn";
import { ListItem } from "@material-ui/core";
import styled from "styled-components";
import PlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import Select from "react-select";

type Props = {
  style?: React.CSSProperties;
};

function PlacesSearch({ ...rest }: Props) {
  const [searchString, setSearchString] = useState("");
  const [, setSearchedAddress] = useGlobal("searchedAddress");
  const [, setCurrentPosition] = useGlobal("currentPosition");

  const handleChange = useCallback(
    (searchString: string) => {
      if (searchString) {
        setSearchString(searchString);
      }
    },
    [setSearchString]
  );

  const handleSelect = useCallback(
    value => {
      if (!value) {
        return;
      }
      const suggestion = value.value;
      handleChange(suggestion.description);
      geocodeByPlaceId(suggestion.placeId)
        .then(results => getLatLng(results[0]))
        .then(location => {
          setSearchedAddress({
            placeId: suggestion.placeId,
            firstLine: suggestion.formattedSuggestion.mainText,
            secondLine: suggestion.formattedSuggestion.secondaryText,
            location
          });
          setCurrentPosition(location);
        })
        .catch(error => {
          console.error(error);
        });
    },
    [handleChange, setSearchedAddress, setCurrentPosition]
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

          const options = suggestions.map(suggestion => ({
            value: suggestion,
            label: suggestion.description
          }));

          return (
            <SelectContainer>
              <Select
                menuIsOpen={options.length > 0}
                filterOption={() => true}
                onInputChange={value => onChange({ target: { value } })}
                components={defaultComponents}
                placeholder={"Search"}
                options={options}
                onChange={handleSelect}
              />
            </SelectContainer>
          );
        }}
      </PlacesAutocomplete>
    </ListItem>
  );
}

const defaultComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null
};

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
