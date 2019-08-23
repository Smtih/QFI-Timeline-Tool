import "reactn-persist";

declare module "reactn-persist" {
  interface Options {
    storage: any;
  }
  declare function initReactnPersist(options: Options): void;
  export default initReactnPersist;
}
