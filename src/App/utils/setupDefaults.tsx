import { Persist } from "./reactnPersist";
import { getGlobal, setGlobal } from "reactn";
import { SuspectData } from "App/components/Map/components";
import Tabletop from "tabletop";

Tabletop.init({
  key: "1qcsUcO02_Ppf965XmiuCYnZZik6pLiV3wO3fBvRwaQs",
  simpleSheet: true,
  parseNumbers: true
}).then((suspects: SuspectData[]) => {
  const global = getGlobal();
  setGlobal({
    ...global,
    suspects
  });
});

const defaultGlobal = {
  currentAddress: null,
  savedAddresses: [],
  suspects: []
};

const persist = new Persist(defaultGlobal, 12 * 60 * 60 * 1000);
persist.initialise();

export { persist };
