import { FunctionComponent, PropsWithChildren } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  chakra,
  Grid,
  GridItem,
  HeadingProps,
  useColorModeValue,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";
import { Header, HeaderProps } from "../header";
import { Footer } from "../footer";
import { EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";

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
  const { header, children } = props;
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
              <CardHeader px={12} pt={12} pb={6}>
                <Header {...header} size={"2xl"} />
              </CardHeader>

              <CardBody px={12} pt={0}>
                {children}
              </CardBody>

              <CardFooter px={12} pt={6}>
                <VStack spacing={12} align="stretch" width="100%">
                  <Button
                    as="a"
                    href="mailto:eresearch@qut.edu.au"
                    justifyContent="space-between"
                    size="lg"
                    target="_blank"
                    leftIcon={<EmailIcon />}
                    colorScheme="blue"
                  >
                    Contact Us / Give Feedback <ExternalLinkIcon mx="2px" />
                  </Button>

                  <Box pb={6}>
                    <Footer
                      acknowledgement={
                        "[QUT acknowledges the Traditional Owners of the lands where QUT now stands.](https://www.qut.edu.au/about/indigenous)"
                      }
                      notice={
                        "TEQSA Provider ID [PRV12079](https://www.teqsa.gov.au/national-register/provider/queensland-university-technology) Australian University | CRICOS No. 00213J"
                      }
                      shortNotice={
                        "TEQSA [PRV12079](https://www.teqsa.gov.au/national-register/provider/queensland-university-technology) | CRICOS 00213J"
                      }
                    />
                  </Box>
                </VStack>
              </CardFooter>
            </Card>
          </chakra.main>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Page;
