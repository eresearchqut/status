import { Meta, StoryFn } from "@storybook/react";
import { OperationalStatus, OperationalStatusData } from "./OperationalStatus";
import jsonData from "../../../public/status.json";

const typedJsonData: OperationalStatusData["data"] =
  jsonData as OperationalStatusData["data"];

export default {
  title: "Component/OperationalStatus",
  component: OperationalStatus,
} as Meta<typeof OperationalStatus>;

const Template: StoryFn<typeof OperationalStatus> = (args) => (
  <OperationalStatus {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: typedJsonData,
};

export const NoDataAvailable = Template.bind({});
NoDataAvailable.args = {
  data: undefined,
};
