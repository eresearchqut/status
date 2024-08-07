import { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";

export interface LogoProps {
  src: string;
  alt: string;
  size?: string;
}

export const Logo: FunctionComponent<LogoProps> = ({
  src,
  alt,
  size = "80px",
}) => <Image boxSize={size} src={src as string} alt={alt} objectFit="cover" />;
export default Logo;
