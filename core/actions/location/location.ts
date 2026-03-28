import { LatLog } from "@/core/infratstructure/interfaces/lat-log";
import * as Location from "expo-location";

export const getCurrentLocation = async (): Promise<LatLog> => {
  try {
    const {coords} = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest
    }) // los permisos de ubicacion de usuario son necesarios para que esto funcione

    return {
        latitude:coords.latitude ,
        longitude:coords.longitude
    }
  } catch (error) {
    throw new Error("Error al obtener la ubicacion actual");
  }
};



export const watchCurrentPosition = (locationCallbBack:(location: LatLog) => void) => {

    return Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 10000,
    },({coords}) => {
        locationCallbBack({ //*funcion que se quiere disparar cuando se reciba un cambio en las coordenadas de la posision actual
            latitude:coords.latitude,
            longitude:coords.longitude
        })
    })
}
