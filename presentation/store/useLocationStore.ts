import { getCurrentLocation, watchCurrentPosition } from "@/core/actions/location/location";
import { LatLog } from "@/core/infratstructure/interfaces/lat-log";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocaltionState {
  lastKnownLocation: LatLog | null;
  userLocationList: LatLog[];
  watchSuscriptionId: LocationSubscription | null;

  //methods

  getLocation: () => Promise<LatLog>;
  watchLocation: () => void; //* solamente buscamos mirar la locacion
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocaltionState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationList: [],
  watchSuscriptionId: null,

  //------ Methods-----------
  getLocation: async () => {
    const location = await getCurrentLocation();
    set({ lastKnownLocation: location });
    return location;
  },
  watchLocation: async() => {
    const oldSubscription  = get().watchSuscriptionId
    if(oldSubscription !== null){
        get().clearWatchLocation
    }

    const watchSuscription  = await watchCurrentPosition((latLag) => {
        set({
            lastKnownLocation:latLag,
            userLocationList:[...get().userLocationList, latLag]

        })
    })

    set({watchSuscriptionId: watchSuscription})

  },
  clearWatchLocation: () => {
    const suscription = get().watchSuscriptionId

    if(suscription !== null){
        suscription.remove()
    }
  }
}));
