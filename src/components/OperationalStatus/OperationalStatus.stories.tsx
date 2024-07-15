import { Meta, StoryFn } from "@storybook/react";
import { OperationalStatus, OperationalStatusProps } from "./OperationalStatus";
import jsonData from "../../../public/status.json";

export default {
  title: "Component/OperationalStatus",
  component: OperationalStatus,
} as Meta<typeof OperationalStatus>;

const Template: StoryFn<typeof OperationalStatus> = (args) => (
  <OperationalStatus {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Display all",
  data: jsonData as OperationalStatusProps["data"],
};

export const Operational = Template.bind({});
Operational.args = {
  ...Default.args,
  title: "Operational status",
  displayOKOnly: true,
};

export const Disruptions = Template.bind({});
Disruptions.args = {
  ...Default.args,
  title: "Service disruptions",
  displayDisruptedOnly: true,
};

export const NoDataAvailable = Template.bind({});
NoDataAvailable.args = {
  title: "No available data",
  data: undefined,
};
