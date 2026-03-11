import { Meta, StoryFn } from "@storybook/react";
import { PastIncidents } from "./PastIncidents";

export default {
  title: "Component/PastIncidents",
  component: PastIncidents,
} as Meta<typeof PastIncidents>;

const Template: StoryFn<typeof PastIncidents> = (args) => (
  <PastIncidents {...args} />
);

const getDateMonthsAgo = (months: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString();
};

const getDateDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const SixInLastThreeMonths = Template.bind({});
SixInLastThreeMonths.args = {
  title: "Past Incidents",
  incidents: Array.from({ length: 6 }).map((_, i) => ({
    name: `Recent Incident ${i + 1}`,
    impact: "Service disrupted",
    reported: getDateDaysAgo((i + 1) * 10),
    restored: getDateDaysAgo((i + 1) * 10 - 1),
  })),
};

export const TwelveOlderThanTwelveMonths = Template.bind({});
TwelveOlderThanTwelveMonths.args = {
  title: "Past Incidents",
  incidents: Array.from({ length: 12 }).map((_, i) => ({
    name: `Old Incident ${i + 1}`,
    impact: "Service disrupted",
    reported: getDateMonthsAgo(13 + i),
    restored: getDateMonthsAgo(13 + i),
  })),
};

export const ZeroIncidents = Template.bind({});
ZeroIncidents.args = {
  title: "Past Incidents",
  incidents: [],
};

export const SixIncidentsOnlyFirstInLastThreeMonths = Template.bind({});
SixIncidentsOnlyFirstInLastThreeMonths.args = {
  title: "Past Incidents",
  incidents: Array.from({ length: 6 }).map((_, i) => ({
    name: `Incident ${i + 1}`,
    impact: "Service disrupted",
    reported: i === 0 ? getDateDaysAgo(10) : getDateMonthsAgo(4 + i),
    restored: i === 0 ? getDateDaysAgo(9) : getDateMonthsAgo(4 + i),
  })),
};
