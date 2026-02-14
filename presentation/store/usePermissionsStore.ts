import { checkLocationPermission, requestLocationPermission } from "@/core/actions/permisions/locations";
import { PermissionsStatus } from "@/core/infratstructure/interfaces/location";
import { create } from "zustand";

interface PermissionsState {
  locationStatus: PermissionsStatus;
  //Actions
  requestLocationPermission: () => Promise<PermissionsStatus>;
  checkLocationPermission: () => Promise<PermissionsStatus>;
}

export const usePermissionsStore = create<PermissionsState>()((set) => ({
  locationStatus: PermissionsStatus.CHECKING,
  requestLocationPermission: async () => {
    const status = await requestLocationPermission()
    set({locationStatus: status})

    return status
  },
  checkLocationPermission: async () => {
    const stauts = await checkLocationPermission()
    set({locationStatus: stauts})
    return stauts
  },
}));
