import Tabletop from "tabletop";
import { setGlobal } from "reactn";
import { Persist } from "./reactnPersist";
import { State } from "reactn/default";

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

async function setTabletopData(global: State) {
  if (global === defaultGlobal) {
    const sheets = await Tabletop.init({
      key: "1qcsUcO02_Ppf965XmiuCYnZZik6pLiV3wO3fBvRwaQs",
      parseNumbers: true
    });
    const suspectData: SuspectSheetData[] = sheets["Suspects"].elements;
    const suspects = suspectData.map(toMappable);

    const addressData: AddressSheetData[] = sheets["Locations"].elements;
    const savedAddresses = addressData.map(toMappable);

    setGlobal({
      ...global,
      suspects,
      savedAddresses
    });
  }
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
  currentDate: "2019-05-12T10:00:00.000+10"
};

const persist = new Persist(defaultGlobal, 12 * 60 * 60 * 1000);
persist.initialise(setTabletopData);

export { persist };
