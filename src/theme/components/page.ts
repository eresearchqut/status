import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers([
    "wrapper",
    "footerContainer",
    "footer",
    "main",
    "mainContainer",
    "header",
    "headerContainer",
    "navigation",
    "navigationContainer",
  ]);

const defaultContainer = {
  p: 4,
  maxWidth: "1440px",
  margin: "0 auto",
};

const baseStyle = definePartsStyle(() => {
  return {
    headerContainer: defaultContainer,
    navigationContainer: defaultContainer,
    mainContainer: {
      ...defaultContainer,
      p: 3,
    },
    footerContainer: defaultContainer,
    header: {
      bgColor: "brand.900",
      color: "brand.100",
    },
    navigation: {
      bgColor: "navigation.900",
      color: "navigation.50",
    },
    footer: {
      bgColor: "brand.900",
      color: "brand.100",
      borderTopColor: "brand.100",
      borderTopWidth: 1,
    },
    main: {},
  };
});

export const pageTheme = defineMultiStyleConfig({
  baseStyle,
});
