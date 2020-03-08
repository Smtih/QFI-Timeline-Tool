import Tabletop from "tabletop";
import { setGlobal } from "reactn";
import { Persist } from "./reactnPersist";
import { State } from "reactn/default";
import { getQueryData } from "./getQueryData";

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

interface SettingSheetData {
  defaultDate: string;
  defaultLat: string;
  defaultLng: string;
  startDate: string;
  endDate: string;
  intervalMinutes: number;
  defaultZoomLevel: number;
}

const { key, timeout } = getQueryData();

async function setTabletopData(global: State): Promise<void> {
  if (global.key == null) {
    if (!key) {
      throw new Error("No Sheet Key In Url");
    }
    const sheets = await Tabletop.init({
      key,
      parseNumbers: true
    });
    const suspectData: SuspectSheetData[] = sheets["Suspects"].elements;
    const suspects = suspectData
      .map(suspect => ({ ...suspect, visible: true }))
      .map(toMappable);

    const addressData: AddressSheetData[] = sheets["Locations"].elements;
    const savedAddresses = addressData.map(toMappable);

    const {
      defaultDate,
      defaultLat,
      defaultLng,
      defaultZoomLevel,
      startDate,
      endDate,
      intervalMinutes
    }: SettingSheetData = sheets["Settings"].elements[0];

    await setGlobal({
      ...global,
      key,
      suspects,
      savedAddresses,
      currentDate: defaultDate,
      defaultCenter: { lat: defaultLat, lng: defaultLng },
      defaultZoom: defaultZoomLevel,
      startDate,
      endDate,
      intervalMinutes
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
  currentDate: "2019-05-12T10:00:00.000+10",
  defaultCenter: { lat: -37.714145, lng: 145.065955 },
  defaultZoom: 14,
  intervalMinutes: 30,
  startDate: "2019-05-12T06:00:00.000+10",
  endDate: "2019-05-14T22:00:00.000+10"
};

const persist = new Persist(defaultGlobal, timeout);
persist.initialise(global => {
  setTabletopData(global).then(() => {
    window.history.replaceState({}, document.title, window.location.pathname);
  });
});

export { persist };
