//* se necesita del paquete de expo location lo mejor es hacer la importacion general
import { PermissionsStatus } from "@/core/infratstructure/interfaces/location";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

export const requestLocationPermission =
  async (): Promise<PermissionsStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      if(status === 'denied'){
        manualPermissionRequest()
      }
      return PermissionsStatus.DENIED;
    }

    return PermissionsStatus.GRANTED;
  };

export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();
  switch (status) {
    case "granted":
      return PermissionsStatus.GRANTED;
    case "denied":
      return PermissionsStatus.DENIED;
    default:
      return PermissionsStatus.UNDETERMITED;
  }
};

export const manualPermissionRequest = async () => {
    Alert.alert(
      'Permiso de ubicacion necesario',
      'Para continuar debe habilitar el permiso de locacion en los ajustes de la app',
      [{text:'Abrir Ajustes',
        onPress:() => {
          Linking.openSettings()
        }
      },
      {
        text:'Cancelar',
        style:'destructive'
      }
    ]
    )
};
