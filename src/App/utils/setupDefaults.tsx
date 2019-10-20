import { Persist } from "./reactnPersist";
import { getGlobal, setGlobal } from "reactn";
import Tabletop from "tabletop";
import { SuspectData } from "reactn/default";

interface SheetData {
  name: string;
  address: string;
  lat: number;
  lng: number;
  startTime: string;
  endTime: string;
  radius: number;
}

Tabletop.init({
  key: "1qcsUcO02_Ppf965XmiuCYnZZik6pLiV3wO3fBvRwaQs",
  simpleSheet: true,
  parseNumbers: true
})
  .then(data => data.map(toSuspectData))
  .then((suspects: SheetData[]) => {
    const global = getGlobal();
    setGlobal({
      ...global,
      suspects
    });
  });

function toSuspectData({
  name,
  radius,
  startTime,
  endTime,
  lat,
  lng
}: SheetData): SuspectData {
  return {
    name,
    radius,
    startTime,
    endTime,
    location: { lat, lng }
  };
}

const defaultGlobal = {
  savedAddresses: [],
  suspects: []
};

const persist = new Persist(defaultGlobal, 12 * 60 * 60 * 1000);
persist.initialise();

export { persist };
