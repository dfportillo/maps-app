import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface FACProps {
    iconName: keyof typeof Ionicons.glyphMap
    onPress:() => void;
    style?: StyleProp<ViewStyle>
}

export default function FAC({onPress,style,iconName}:FACProps) {
  return (
    <View style={[styles.btn,style]}>
      <Pressable
        onPress={onPress}
      >
        <Ionicons name={iconName} color={'white'} size={30}/>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    zIndex: 10,
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius:30,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 4.5,
    },
  },
});
