import type { AppProps } from "next/app";
import { theme } from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/oxygen";
import "@fontsource-variable/asap";
import UmamiAnalytics from "@danielgtmn/umami-react";

function StatusApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <UmamiAnalytics
        url={process.env.NEXT_PUBLIC_UMAMI_URL}
        websiteId={process.env.NEXT_PUBLIC_UMAMI_ID}
      />
    </>
  );
}

export default StatusApp;
