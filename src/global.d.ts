import "reactn";
import { AddressData, SuspectData } from "App/components/Map/components";

declare module "reactn/default" {
  export interface Reducers {}
  export interface State {
    currentAddress: AddressData | null;
    savedAddresses: AddressData[];
    suspects: SuspectData[];
  }
}
