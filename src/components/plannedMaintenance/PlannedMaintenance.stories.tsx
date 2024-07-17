import { Meta, StoryFn } from "@storybook/react";
import { PlannedMaintenance } from "./PlannedMaintenance";

export default {
  title: "Component/PlannedMaintenance",
  component: PlannedMaintenance,
} as Meta<typeof PlannedMaintenance>;

const Template: StoryFn<typeof PlannedMaintenance> = (args) => (
  <PlannedMaintenance {...args} />
);

export const NoDataAvailable = Template.bind({});
NoDataAvailable.args = {};

export const OnePlannedMaintenances = Template.bind({});
OnePlannedMaintenances.args = {
  lastUpdated: "",
  plannedMaintenances: [
    {
      service: "HPC-FS",
      from: "2024-07-26T09:53:42+1000",
      to: "2024-07-26T12:53:42+1000",
      impact: "Service will be unavailable",
    },
  ],
};

export const TwoPlannedMaintenances = Template.bind({});
TwoPlannedMaintenances.args = {
  lastUpdated: "",
  plannedMaintenances: [
    {
      service: "HPC-FS",
      from: "2024-07-26T09:53:42+1000",
      to: "2024-07-26T12:53:42+1000",
      impact: "Service will be unavailable",
    },
    {
      service: "PBS Server",
      from: "2024-07-27T09:53:42+1000",
      to: "2024-07-27T12:53:42+1000",
      impact: "Service will be unavailable",
    },
  ],
};

export const TwoPlannedMaintenancesWithLastUpdate = Template.bind({});
TwoPlannedMaintenancesWithLastUpdate.args = {
  lastUpdated: "2024-07-20T19:00:12+1000",
  plannedMaintenances: [
    {
      service: "HPC-FS",
      from: "2024-07-26T09:53:42+1000",
      to: "2024-07-26T12:53:42+1000",
      impact: "Service will be unavailable",
    },
    {
      service: "PBS Server",
      from: "2024-07-27T09:53:42+1000",
      to: "2024-07-27T12:53:42+1000",
      impact: "Service will be unavailable",
    },
  ],
};
