import React from "react";
import styled from "styled-components";
import PlacesAutocomplete from "react-places-autocomplete";
import Select from "react-select";

type Props = { handleAddressSelected: (address: string) => void };
type State = { address: string };

class PlacesSearch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address: string) => {
    if (address) {
      this.setState({ address });
    }
  };

  handleSelect = (address: string) => {
    this.handleChange(address);
    this.props.handleAddressSelected(address);
  };

  render() {
    const { handleAddressSelected, ...rest } = this.props;
    return (
      <StyledPlacesAutocomplete
        debounce={500}
        value={this.state.address}
        onChange={this.handleChange}
        searchOptions={searchOptions}
        {...rest}
      >
        {({ getInputProps, suggestions, loading }) => {
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
                this.handleSelect(value.label);
              }}
            />
          );
        }}
      </StyledPlacesAutocomplete>
    );
  }
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
