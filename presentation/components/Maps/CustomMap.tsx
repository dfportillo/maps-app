import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
//--------------------------------------------------------------------------------
import { LatLog } from "@/core/infratstructure/interfaces/lat-log";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import FAC from "../shared/buttons/FAC";

interface CustomMapProps extends ViewProps {
  showUserLocation?: boolean;
  initialUserLocation: LatLog;
}

const CustomMap = ({
  initialUserLocation,
  showUserLocation = true,
  ...rest
}: CustomMapProps) => {
  const {
    watchLocation,
    getLocation,
    clearWatchLocation,
    lastKnownLocation,
    userLocationList,
  } = useLocationStore();

  const mapRef = useRef<MapView>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [showPolyline, setShowPolyline] = useState(false);

  const moveCameraUpdate = (latLog: LatLog) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({ center: latLog });
  };
  useEffect(() => {
    watchLocation();
    return () => {
      clearWatchLocation();
    };
  }, []);

  // Efecto para que la pantalla siga el recorrido del usuario

  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraUpdate(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowingUser]);

  const movetoCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCameraUpdate(initialUserLocation);
    } else {
      moveCameraUpdate(lastKnownLocation);
    }

    const location = await getLocation();
    if (!location) return;

    moveCameraUpdate(location);
  };

  return (
    <View {...rest}>
      <Text>HOLA</Text>
      <MapView
        ref={mapRef}
        showsUserLocation={showUserLocation}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onTouchStart={() => setIsFollowingUser(false)}
        initialRegion={{
          latitude: initialUserLocation.latitude,
          longitude: initialUserLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {showPolyline && (
          <Polyline
            coordinates={userLocationList}
            strokeColor={"red"}
            strokeWidth={5}
          />
        )}
      </MapView>

      <FAC
        iconName={showPolyline ? "eye" : "eye-off"}
        onPress={() => setShowPolyline(!showPolyline)}
        style={{
          bottom: 160,
          right: 20,
        }}
      />

      <FAC
        iconName={isFollowingUser ? "walk" : "accessibility"}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        style={{
          bottom: 105,
          right: 20,
        }}
      />

      <FAC
        iconName="search"
        onPress={movetoCurrentLocation}
        style={{
          bottom: 50,
          right: 20,
        }}
      />
    </View>
  );
};

export default CustomMap;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
