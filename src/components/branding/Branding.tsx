import { FunctionComponent } from "react";
import {
  Box,
  Heading,
  HeadingProps,
  HStack,
  Link,
  StackDivider,
} from "@chakra-ui/react";
import { Logo, LogoProps } from "../logo";

export interface BrandingProps extends HeadingProps {
  logo?: LogoProps;
  heading: string;
  hasLogoHeadingDivider?: boolean;
  size?: string;
}

export const Branding: FunctionComponent<BrandingProps> = (props) => {
  const {
    logo,
    heading,
    hasLogoHeadingDivider = true,
    size = props ? props?.size : ["sm", "md"],
    ...headingProps
  } = props;

  return (
    <Link href={"/"} textDecoration="none" aria-label={"Home Page"}>
      <HStack
        spacing={[2, 3, 4]}
        divider={
          hasLogoHeadingDivider ? <StackDivider bg={"brand.50"} /> : <Box></Box>
        }
        align={"center"}
      >
        {logo && <Logo {...logo} />}
        <Heading as={"span"} size={size} {...headingProps}>
          {heading}
        </Heading>
      </HStack>
    </Link>
  );
};

export default Branding;
