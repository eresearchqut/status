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

export interface PageProps {
  header: HeaderProps;
  pageTitle?: string;
  pageTitleSize?: HeadingProps["size"];
  pageTitleHeading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "expandableMain";
  isLanding?: boolean;
}

export const Page: FunctionComponent<PropsWithChildren<PageProps>> = (
  props
) => {
  const {
    header,
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
              <CardHeader px={12} pt={12} pb={0}>
                <Header {...header} />
                {pageTitle && (
                  <Heading as={pageTitleHeading} size={pageTitleSize}>
                    {pageTitle}
                  </Heading>
                )}
              </CardHeader>
              <CardBody px={6} pt={0}>
                {children}
              </CardBody>
            </Card>
          </chakra.main>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Page;
