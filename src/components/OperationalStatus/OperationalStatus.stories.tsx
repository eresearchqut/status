import { Meta, StoryFn } from "@storybook/react";
import { OperationalStatus, ServiceStatus } from "./OperationalStatus";

export default {
  title: "Component/OperationalStatus",
  component: OperationalStatus,
} as Meta<typeof OperationalStatus>;

const Template: StoryFn<typeof OperationalStatus> = (args) => (
  <OperationalStatus {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Operational status",
  lastUpdated: "2024-07-02T15:53:42+1000",
  services: [
    {
      name: "Jupyter Hub",
      status: ServiceStatus.FAILURE,
      error: "404",
    },
    {
      name: "Lyra login node",
      status: ServiceStatus.OK,
    },
    {
      name: "XNAT",
      status: ServiceStatus.OK,
    },
    {
      name: "eResearch Portal",
      status: ServiceStatus.OK,
    },
    {
      name: "rVDI",
      status: ServiceStatus.OK,
    },
  ],
};

export const AllOperational = Template.bind({});
AllOperational.args = {
  ...Default.args,
  services: [
    {
      name: "Lyra login node",
      status: ServiceStatus.OK,
    },
    {
      name: "XNAT",
      status: ServiceStatus.OK,
    },
    {
      name: "eResearch Portal",
      status: ServiceStatus.OK,
    },
    {
      name: "rVDI",
      status: ServiceStatus.OK,
    },
  ],
  filter: ServiceStatus.OK,
};

export const Disruptions = Template.bind({});
Disruptions.args = {
  ...Default.args,
  title: "Service disruptions",
  filter: ServiceStatus.FAILURE,
};

export const NoDataAvailable = Template.bind({});
NoDataAvailable.args = {
  title: "No available data",
  services: undefined,
};

export const OperationalWithDisruptedOnly = Template.bind({});
OperationalWithDisruptedOnly.args = {
  lastUpdated: "2024-07-02T15:53:42+1000",
  services: [
    {
      name: "Jupyter Hub",
      status: ServiceStatus.FAILURE,
      error: "404",
    },
  ],
  title: "Operational status",
  filter: ServiceStatus.OK,
};

export const DisruptionsWithOKOnly = Template.bind({});
DisruptionsWithOKOnly.args = {
  lastUpdated: "2024-07-02T15:53:42+1000",
  services: [
    {
      name: "Lyra login node",
      status: ServiceStatus.OK,
    },
    {
      name: "XNAT",
      status: ServiceStatus.OK,
    },
    {
      name: "eResearch Portal",
      status: ServiceStatus.OK,
    },
    {
      name: "rVDI",
      status: ServiceStatus.OK,
    },
  ],
  title: "Service disruptions",
  filter: ServiceStatus.FAILURE,
};
