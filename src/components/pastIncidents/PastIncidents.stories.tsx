import { Meta, StoryFn } from "@storybook/react";
import { PastIncidents, PastIncidentsData } from "./PastIncidents";
import jsonData from "../../../public/incidents.json";

const typedJsonData: PastIncidentsData["data"] =
  jsonData as PastIncidentsData["data"];

export default {
  title: "Component/PastIncidents",
  component: PastIncidents,
} as Meta<typeof PastIncidents>;

const Template: StoryFn<typeof PastIncidents> = (args) => (
  <PastIncidents {...args} />
);

export const Simple = Template.bind({});
Simple.args = {
  title: "Past Incidents",
  subTitle: "Showing all past incidents in the last 6 months",
  data: typedJsonData,
};
