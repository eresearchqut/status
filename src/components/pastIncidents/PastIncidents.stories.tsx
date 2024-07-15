import { Meta, StoryFn } from "@storybook/react";
import { PastIncidents } from "./PastIncidents";

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
  lastUpdated: "2024-07-02T15:53:42+1000",
  incidents: [
    {
      reported: "2024-04-16T10:53:42+1000",
      reason: "PB Server - service disrupted",
    },
    {
      reported: "2024-02-12T09:43:42+1000",
      reason: "HPC-FS Scheduled maintenance",
    },
    {
      reported: "2023-12-13T06:33:42+1000",
      reason: "PB Server - service disrupted",
    },
    {
      reported: "2023-10-19T07:33:32+1000",
      reason: "HPC-FS Scheduled maintenance",
    },
  ],
};

export const NoDataAvailable = Template.bind({});
NoDataAvailable.args = {
  incidents: undefined,
};
