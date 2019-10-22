import "reactn";

declare module "reactn/default" {
  export interface Mappable {
    location: google.maps.LatLngLiteral;
  }

  export interface AddressData extends Mappable {
    placeId: string;
    full: string;
    firstLine: string;
    secondLine: string;
  }

  export interface SuspectData extends Mappable {
    name: string;
    radius: number;
    startTime: string;
    endTime: string;
  }

  export interface Reducers {}
  export interface State {
    currentPosition?: google.maps.LatLngLiteral;
    searchedAddress?: AddressData;
    savedAddresses: AddressData[];
    suspects: SuspectData[];
    currentDate: string;
  }
}
