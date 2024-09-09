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

export const TEQSAAndCRICOS = Template.bind({});
TEQSAAndCRICOS.args = {
  notice:
    "TEQSA Provider ID [PRV12079](https://www.teqsa.gov.au/national-register/provider/queensland-university-technology) Australian University | CRICOS No. 00213J",
  acknowledgement:
    "[Acknowledgement of Country](https://www.indigenous.gov.au/contact-us/welcome_acknowledgement-country)",
};

export const TEQSAAndCRICOSWithShortNotice = Template.bind({});
TEQSAAndCRICOSWithShortNotice.args = {
  notice:
    "TEQSA Provider ID [PRV12079](https://www.teqsa.gov.au/national-register/provider/queensland-university-technology) Australian University | CRICOS No. 00213J",
  shortNotice:
    "TEQSA [PRV12079](https://www.teqsa.gov.au/national-register/provider/queensland-university-technology) | CRICOS 00213J",
  acknowledgement:
    "[Acknowledgement of Country](https://www.indigenous.gov.au/contact-us/welcome_acknowledgement-country)",
};
