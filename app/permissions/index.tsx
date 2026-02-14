import { View, Text, Pressable } from "react-native";
import React from "react";
import { usePermissionsStore } from "@/presentation/store/usePermissionsStore";
import ThemedPressable from "@/presentation/components/shared/themed-pressable";

export default function PermissionScreen() {

  const {locationStatus,requestLocationPermission} = usePermissionsStore()

  return (
    <View style={{
      flex:1,justifyContent:'center',alignItems:'center'
    }}>
      <ThemedPressable
        onPress={requestLocationPermission}
      >
        Habilitar Ubicacion
      </ThemedPressable>
      <Text style={{
        color:'white',
        paddingTop:20
      }}>Estado Actual: {locationStatus}</Text>
    </View>
  );
}
