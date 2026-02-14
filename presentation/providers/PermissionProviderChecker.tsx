import React, { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { router } from "expo-router";
// --------------------------------------------------------------------
import { usePermissionsStore } from "../store/usePermissionsStore";
import { PermissionsStatus } from "@/core/infratstructure/interfaces/location";


// componente HighOrder 
const PermissionProviderChecker = ({children}:PropsWithChildren) => {

  const {locationStatus,checkLocationPermission} = usePermissionsStore()

  // efecto que revisa el permiso y lo coloca en nustro storage
  useEffect(() => {
    checkLocationPermission()
  }, []);
  
  // efecto que revisa si esta el permiso nos envia a map
  useEffect(() => {
    if(locationStatus === PermissionsStatus.GRANTED){
      router.replace('/map')
    }else if(locationStatus !== PermissionsStatus.CHECKING){
      router.replace('/permissions') //? vamos a la pagina de permisos
    }
    
  }, [locationStatus]);
  
  // efecto que revisa constantemente si el estatus de location cambio

  useEffect(() => {
    // App state nos da un resultado de en que situacion esta mi App con respecto a mi tlf 
    const subscrition = AppState.addEventListener('change',(nextAppState) => {
      if(nextAppState==='active'){
        checkLocationPermission()
      }
    })
    return () => {
      subscrition.remove()
    };
  }, []);
  

  return <>{children}</>;
};

export default PermissionProviderChecker;
