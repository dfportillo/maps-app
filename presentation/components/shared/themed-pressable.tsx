import { Text, Pressable, PressableProps } from "react-native";
import React from "react";

interface ThemedPressableProps extends PressableProps {
  children: string;
}

const ThemedPressable = ({ children, ...rest }: ThemedPressableProps) => {
  return (
    <Pressable
      style={{
        backgroundColor: "#0004ff",
        padding: 12,
        borderRadius: 10,
      }}
      {...rest}
    >
      <Text style={{ color: "white" }}>{children}</Text>
    </Pressable>
  );
};

export default ThemedPressable;
