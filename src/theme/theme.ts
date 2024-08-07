import { extendTheme, theme as baseTheme, ThemeConfig } from "@chakra-ui/react";
import { Button, Link, Page } from "./components";

const config: ThemeConfig = {};

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

const colors = {
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
};

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 800,
};

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
};

const fonts = {
  heading: `'Oxygen', sans-serif`,
  body: `'Asap', sans-serif`,
};

export const overrides: Record<string, any> = {
  config,
  fonts,
  colors,
  fontWeights,
  breakpoints,
  components: {
    Button,
    Link,
    Page,
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
};

export const theme = extendTheme(baseTheme, overrides);
export default theme;
