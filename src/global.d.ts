import "reactn";
import { REHIDRATED_KEY } from "reactn-persist";

declare module "reactn/default" {
  export interface Reducers {}

  export interface State {
    [REHIDRATED_KEY]: boolean;
    currentAddress: string;
    savedAddresses: string[];
  }
}
