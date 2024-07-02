import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import "@fontsource/oxygen";

import "@fontsource-variable/asap";

const overrides = {
  fonts: {
    heading: `'Oxygen', sans-serif`,
    body: `'Asap', sans-serif`,
  },
  colors: {
    avatar: {
      "500": "#0066B9",
      "50": "#EFF6FB",
    },
    base: {
      "900": "#012A4C",
      "800": "#0A3B64",
      "700": "#124C7B",
      "600": "#09599A",
      "500": "#0066B9",
      "400": "#0083CE",
      "300": "#009FE3",
      "200": "#78AEDA",
      "100": "#EFF6FB",
      "50": "#FFFFFF",
    },
    brand: {
      "900": "#012A4C",
      "700": "#124C7B",
      "500": "#0066B9",
      "100": "#FFFFFF",
      "50": "#FFFFFF",
    },
    navigation: {
      "900": "#333333",
      "800": "#222222",
      "500": "#FFFFFF",
      "100": "#FFFFFF",
      "50": "#FFFFFF",
      _active: {
        bg: "navigation.900",
      },
    },
  },
};

const colorScheme = "base";
const theme = extendTheme(overrides, withDefaultColorScheme({ colorScheme }));

export const parameters = {
  chakra: {
    theme,
  },
};
