import { FunctionComponent, PropsWithChildren } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  chakra,
  Grid,
  GridItem,
  Heading,
  HeadingProps,
  useColorModeValue,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { Header, HeaderProps } from "../header";
import { Footer, FooterProps } from "../footer";
import { LoadingProgress, LoadingProgressProps } from "../loadingProgress";

export interface PageProps {
  header: HeaderProps;
  pageTitle?: string;
  pageTitleSize?: HeadingProps["size"];
  pageTitleHeading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  footer: FooterProps;
  variant?: "expandableMain";
  loadingProgress?: LoadingProgressProps;
  isLanding?: boolean;
}

export const Page: FunctionComponent<PropsWithChildren<PageProps>> = (
  props
) => {
  const {
    loadingProgress,
    header,
    footer,
    pageTitle,
    pageTitleSize = "xl",
    pageTitleHeading = "h1",
    children,
  } = props;
  const templateAreas = `"header" "navigation" "main" "footer"`;
  const gridTemplateRows = "auto auto 1fr auto";
  const styles = useMultiStyleConfig("Page", props);

  const pageColor = useColorModeValue("gray.100", "gray.800");
  const cardColor = useColorModeValue("white", "gray.700");
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Grid
      templateAreas={templateAreas}
      gridTemplateRows={gridTemplateRows}
      transition="width .4s ease-in-out"
      minH={"100vh"}
      bgColor={pageColor}
    >
      <GridItem area={"header"}>
        <Box __css={styles.header}>
          <chakra.header __css={styles.headerContainer}>
            <Header {...header} />
          </chakra.header>
        </Box>
      </GridItem>

      <GridItem area={"main"}>
        <Box __css={styles.main}>
          <chakra.main __css={styles.mainContainer}>
            <Card
              rounded={1}
              mb={0}
              bgColor={cardColor}
              borderWidth={1}
              borderColor={cardBorderColor}
            >
              <CardHeader pl={6} pr={6} pb={0}>
                {pageTitle && (
                  <Heading as={pageTitleHeading} size={pageTitleSize}>
                    {pageTitle}
                  </Heading>
                )}
              </CardHeader>
              <CardBody pl={6} pr={6}>
                {children}
              </CardBody>
            </Card>
          </chakra.main>
        </Box>
      </GridItem>

      <GridItem area={"footer"}>
        {loadingProgress && <LoadingProgress {...loadingProgress} />}
        <Box __css={styles.footer}>
          <chakra.footer __css={styles.footerContainer}>
            <Footer {...footer} />
          </chakra.footer>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Page;
