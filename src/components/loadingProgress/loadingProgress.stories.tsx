import { Meta, StoryFn } from "@storybook/react";
import { LoadingProgress } from "./loadingProgress";

export default {
  title: "Component/LoadingProgress",
  component: LoadingProgress,
} as Meta<typeof LoadingProgress>;

const Template: StoryFn<typeof LoadingProgress> = (args) => (
  <LoadingProgress {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const MediumWithLabel = Template.bind({});
MediumWithLabel.args = {
  size: "md",
};
