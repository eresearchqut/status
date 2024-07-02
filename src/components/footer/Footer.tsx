import { FunctionComponent, PropsWithChildren } from "react";
import { Stack } from "@chakra-ui/react";
import { Markdown } from "../markdown";

export interface FooterProps {
  acknowledgement: string;
  notice: string;
}

export const Footer: FunctionComponent<PropsWithChildren<FooterProps>> = (
  props
) => {
  const { acknowledgement, notice, children } = props;
  return (
    <Stack
      direction={["column", "row"]}
      justifyContent={["flex-start", "space-between"]}
    >
      <Markdown markdown={acknowledgement} />
      {children}
      <Markdown markdown={notice} />
    </Stack>
  );
};

export default Footer;
