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

export const Operational = Template.bind({});
Operational.args = {
  title: "Operational status",
  data: typedJsonData,
  displayOKOnly: true,
};

export const Disruptions = Template.bind({});
Disruptions.args = {
  title: "Service disruptions",
  data: typedJsonData,
  displayDisruptedOnly: true,
};

export const DisplayAllData = Template.bind({});
DisplayAllData.args = {
  title: "Service disruptions",
  data: typedJsonData,
  displayOKOnly: false,
  displayDisruptedOnly: false,
};

export const NoDataAvailable = Template.bind({});
NoDataAvailable.args = {
  title: "No available data",
  data: undefined,
};
