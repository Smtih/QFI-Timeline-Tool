import React, { useState, useCallback } from "react";
import { useGlobal } from "reactn";
import { ListItem } from "@material-ui/core";
import PlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

type Props = {
  style?: React.CSSProperties;
};

function PlacesSearch({ ...rest }: Props) {
  const [searchString, setSearchString] = useState("");
  const [, setSearchedAddress] = useGlobal("searchedAddress");
  const [currentPosition, setCurrentPosition] = useGlobal("currentPosition");
  const [defaultCenter] = useGlobal("defaultCenter");

  const handleChange = useCallback(
    (searchString: string) => {
      if (typeof searchString === "string") {
        setSearchString(searchString);
      } else {
        setSearchString("");
      }
    },
    [setSearchString]
  );

  const handleSelect = useCallback(
    (event, suggestion) => {
      if (!suggestion) {
        return;
      }
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
        searchOptions={{
          location: new google.maps.LatLng(currentPosition || defaultCenter),
          ...searchOptions
        }}
      >
        {({ getInputProps, suggestions }) => {
          const { onChange, value } = getInputProps();

          return (
            <Autocomplete
              style={{ display: "flex", flex: 1 }}
              options={[...suggestions]}
              getOptionLabel={suggestion => suggestion.description}
              onInputChange={onChange}
              onChange={handleSelect}
              inputValue={value}
              freeSolo
              selectOnFocus
              renderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  label={"Places Search"}
                  variant={"outlined"}
                />
              )}
            />
          );
        }}
      </PlacesAutocomplete>
    </ListItem>
  );
}

const searchOptions = {
  radius: 5000,
  componentRestrictions: {
    country: "AU"
  }
};

export { PlacesSearch };
