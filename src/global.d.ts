import "reactn";
import { REHIDRATED_KEY } from "reactn-persist";

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
    [REHIDRATED_KEY]: boolean;
    currentAddress: Address;
    savedAddresses: Address[];
  }
}
