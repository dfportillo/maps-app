import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React from "react";

export default function MappScreen() {
  return (
    <View style={styles.conteiner}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          //8.268225, -62.759109
          latitude: 8.268225,
          longitude: -62.759109,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    // width: "100%",
    // height: "100%",
    // backgroundColor:'blue',
    ...StyleSheet.absoluteFillObject,
  },
});
