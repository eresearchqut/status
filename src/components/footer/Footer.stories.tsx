import { Meta, StoryFn } from "@storybook/react";
import { Footer } from "./Footer";

export default {
  title: "Component/Footer",
  component: Footer,
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  notice: "©eResearch QUT 2022",
  acknowledgement:
    "[Acknowledgement of Country](https://www.indigenous.gov.au/contact-us/welcome_acknowledgement-country)",
};
