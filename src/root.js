import StackLayer from "@/_layout";

import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { useSettings } from "./hooks/useSettings";
import { DefaultTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";

registerTranslation("en-GB", enGB);

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
    background: "#ffffff",
    surface: "#ffffff",
    text: "#000000",
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#bb86fc",
    accent: "#03dac6",
    background: "#121212",
    surface: "#121212",
    text: "#ffffff",
  },
};

export default function Root() {
  const { settings } = useSettings();
  const systemScheme = useColorScheme(); // "light" or "dark"

  const theme =
    settings.themeConfig === "system"
      ? systemScheme === "dark"
        ? darkTheme
        : lightTheme
      : settings.themeConfig === "dark"
      ? darkTheme
      : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StackLayer />
      </NavigationContainer>
    </PaperProvider>
  );
}

registerRootComponent(Root);
