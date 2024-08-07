import { defineStyleConfig } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: 2,
  },
  defaultProps: {
    size: "sm",
  },
});
