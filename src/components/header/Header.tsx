import { FunctionComponent, PropsWithChildren } from "react";
import { Stack } from "@chakra-ui/react";
import { Branding, BrandingProps } from "../branding";

export interface HeaderProps {
  branding: BrandingProps;
  size?: string;
}

export const Header: FunctionComponent<PropsWithChildren<HeaderProps>> = (
  props
) => {
  const { children, branding } = props;

  return (
    <Stack
      direction={["column", "row"]}
      justifyContent={["flex-start", "space-between"]}
    >
      <Branding {...branding} size={props?.size} />
      {children}
    </Stack>
  );
};

export default Header;
