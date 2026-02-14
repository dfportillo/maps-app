import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { useColorScheme } from "@/presentation/hooks/use-color-scheme";


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="loading/index" options={{animation:'none'}}/>
        <Stack.Screen name="map/index" options={{animation:'none'}}/>
        <Stack.Screen name="permissions/index" options={{animation:'none'}}/>
      </Stack>
    </ThemeProvider>
  );
}
