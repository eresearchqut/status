import { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";

export interface LogoProps {
  src: string;
  alt: string;
}

export const Logo: FunctionComponent<LogoProps> = ({ src, alt }) => (
  <Image
    src={src as string}
    alt={alt}
    objectFit="cover"
    maxH={["40px", "50px"]}
  />
);
export default Logo;
