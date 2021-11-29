import * as Papa from "papaparse";
import { setGlobal } from "reactn";
import { Persist } from "./reactnPersist";
import { State, SuspectData } from "reactn/default";
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
  if (global.key == null && key) {
    console.log(key);
    const configs: Array<{ sheet: string; url: string }> = await loadRemoteData(
      `https://docs.google.com/spreadsheets/d/e/${key}/pub?output=csv`
    );
    console.log(configs);
    const suspectData: SuspectSheetData[] = await loadRemoteData(
      configs.find(({ sheet }) => sheet === "Suspects")?.url!
    );
    const suspects = suspectData.map(parseSuspect);

    const addressData: AddressSheetData[] = await loadRemoteData(
      configs.find(({ sheet }) => sheet === "Locations")?.url!
    );
    const savedAddresses = addressData.map(toMappable);

    const {
      defaultDate,
      defaultLat,
      defaultLng,
      defaultZoomLevel,
      startDate,
      endDate,
      intervalMinutes
    }: SettingSheetData = await loadRemoteData(
      configs.find(({ sheet }) => sheet === "Settings")?.url!
    ).then(([data]) => data);

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

async function loadRemoteData(url: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: result => {
        return resolve(result.data);
      },
      error: error => {
        reject(error);
      }
    });
  });
}

function parseSuspect({ lat, lng, ...rest }: SuspectSheetData): SuspectData {
  return {
    ...rest,
    location: randomLocation({ lat, lng }, rest.radius),
    visible: true
  };
}

function randomLocation({ lat, lng }: LocationData, radius: number) {
  // Convert radius from meters to degrees
  const radiusInDegrees = radius / 111000;

  const w = radiusInDegrees * Math.sqrt(Math.random());
  const t = 2 * Math.PI * Math.random();
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  // Adjust the x-coordinate for the shrinking of the east-west distances
  const new_x = x / Math.cos((lat * Math.PI) / 180);

  const foundLongitude = new_x + lng;
  const foundLatitude = y + lat;

  return { lat: foundLatitude, lng: foundLongitude };
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
