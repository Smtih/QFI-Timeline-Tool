import "reactn-persist";
import { State } from "reactn/default";

declare module "reactn-persist" {
  interface Options {
    storage: any;
    debug?: boolean;
    initialValue?: State;
  }

  declare function initReactnPersist(options: Options): void;
  export default initReactnPersist;
  export const REHIDRATED_KEY: "rehidrated";
}
