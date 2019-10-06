import "reactn";

declare module "reactn/default" {
  export interface Reducers {}

  interface Location {
    lat: number;
    lng: number;
  }

  interface Address {
    placeId: string;
    full: string;
    firstLine: string;
    secondLine: string;
    location: Location;
  }

  interface Suspect {
    name: string;
    location: Location;
    radius: number;
    startTime: string;
    endTime: string;
  }

  export interface State {
    currentAddress: Address | null;
    savedAddresses: Address[];
    suspects: Suspect[];
  }
}
