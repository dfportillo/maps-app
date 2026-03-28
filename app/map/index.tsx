import { ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import CustomMap from "@/presentation/components/Maps/CustomMap";
import { useLocationStore } from "@/presentation/store/useLocationStore";

export default function MappScreen() {
  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  
  if (lastKnownLocation === null) {
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
  }

  return (
    <View>
      <CustomMap
        initialUserLocation={lastKnownLocation}
      />
    </View>
  );
}
