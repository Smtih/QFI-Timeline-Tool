import "reactn";

declare module "reactn/default" {
  export interface Reducers {}

  interface Address {
    placeId: string;
    full: string;
    firstLine: string;
    secondLine: string;
    location: {
      lat: number;
      lng: number;
    };
  }

  export interface State {
    currentAddress: Address | null;
    savedAddresses: Address[];
  }
}
