import type { AppProps } from "next/app";
import { theme } from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/oxygen";
import "@fontsource-variable/asap";

// you can extend the theme and add custom colors, font styles, etc.

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
