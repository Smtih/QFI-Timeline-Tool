import Tabletop from "tabletop";
import { getGlobal, setGlobal } from "reactn";
import { SuspectData } from "reactn/default";
import { Persist } from "./reactnPersist";

interface SuspectSheetData {
  name: string;
  color: string;
  address: string;
  lat: number;
  lng: number;
  startTime: string;
  endTime: string;
  radius: number;
}

async function setTabletopData() {
  const sheets = await Tabletop.init({
    key: "1qcsUcO02_Ppf965XmiuCYnZZik6pLiV3wO3fBvRwaQs",
    parseNumbers: true
  });
  const suspectData: SuspectSheetData[] = sheets["Encoded V1"].elements;
  const suspects = suspectData.map(toSuspectData);
  const global = getGlobal();
  setGlobal({
    ...global,
    suspects
  });
}

function toSuspectData({
  name,
  color,
  radius,
  startTime,
  endTime,
  lat,
  lng
}: SuspectSheetData): SuspectData {
  return {
    name,
    color,
    radius,
    startTime,
    endTime,
    location: { lat, lng }
  };
}

const defaultGlobal = {
  savedAddresses: [],
  suspects: [],
  currentDate: "2019-05-12T10:00:00.000Z"
};

const persist = new Persist(defaultGlobal, 12 * 60 * 60 * 1000);
persist.initialise();

setTabletopData();

export { persist };
