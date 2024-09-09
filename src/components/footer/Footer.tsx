import { Fragment, FunctionComponent, PropsWithChildren } from "react";
import { Show, Stack } from "@chakra-ui/react";
import { Markdown } from "../markdown";

export interface FooterProps {
  acknowledgement: string;
  notice: string;
  shortNotice?: string;
}

export const Footer: FunctionComponent<PropsWithChildren<FooterProps>> = (
  props
) => {
  const { acknowledgement, notice, shortNotice, children } = props;
  return (
    <Stack direction={["row"]} justifyContent={["space-between"]}>
      <Markdown markdown={acknowledgement} />
      {children}
      <Fragment>
        <Show below={"md"}>
          <Markdown markdown={shortNotice ?? notice} />
        </Show>
        <Show above={"md"}>
          <Markdown markdown={notice} />
        </Show>
      </Fragment>
    </Stack>
  );
};

export default Footer;
