import { LatLog } from "@/core/infratstructure/interfaces/lat-log";
import * as Location from "expo-location";

export const getCurrentLocation = async (): Promise<LatLog> => {
  try {
    const {coords} = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
    }) // los permisos de ubicacion de usuario son necesarios para que esto funcione

    return {
        latitude:coords.latitude ,
        longitude:coords.longitude
    }
  } catch (error) {
    throw new Error("Error al obtener la ubicacion actual");
  }
};

interface watchCurrentPositionProps {
    locationCallbBack: (location: LatLog) => void
}

export const watchCurrentPosition = ({locationCallbBack}:watchCurrentPositionProps) => {

    return Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 10000,
    },({coords}) => {
        locationCallbBack({
            latitude:coords.latitude,
            longitude:coords.longitude
        })
    })
}
