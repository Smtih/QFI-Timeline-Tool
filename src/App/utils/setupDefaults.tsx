import Tabletop from "tabletop";
import { getGlobal, setGlobal } from "reactn";
import { Persist } from "./reactnPersist";

interface LocationData {
  lat: number;
  lng: number;
}

interface SuspectSheetData extends LocationData {
  name: string;
  color: string;
  address: string;
  startTime: string;
  endTime: string;
  radius: number;
}

interface AddressSheetData extends LocationData {
  placeId: string;
  firstLine: string;
  secondLine: string;
}

async function setTabletopData() {
  const sheets = await Tabletop.init({
    key: "1qcsUcO02_Ppf965XmiuCYnZZik6pLiV3wO3fBvRwaQs",
    parseNumbers: true
  });
  const suspectData: SuspectSheetData[] = sheets["Suspects"].elements;
  const suspects = suspectData.map(toMappable);

  const addressData: AddressSheetData[] = sheets["Locations"].elements;
  const savedAddresses = addressData.map(toMappable);

  const global = getGlobal();
  setGlobal({
    ...global,
    suspects,
    savedAddresses
  });
}

function toMappable({ lat, lng, ...rest }: LocationData) {
  return {
    ...rest,
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
