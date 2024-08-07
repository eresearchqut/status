import { Meta, StoryFn } from "@storybook/react";

import { Markdown } from "./Markdown";

export default {
  title: "Component/Markdown",
  component: Markdown,
} as Meta<typeof Markdown>;

const Template: StoryFn<typeof Markdown> = (args) => <Markdown {...args} />;
export const Default = Template.bind({});
Default.args = {
  flattenParagraphs: false,
  markdown: `A paragraph with *emphasis* and **strong importance**.

Another paragraph with _italics_.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`,
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  markdown: "https://reactjs.org",
};

export const ExternalLinkWithAlternateText = Template.bind({});
ExternalLinkWithAlternateText.args = {
  markdown: "[I am a link](https://reactjs.org)",
};

export const Headings = Template.bind({});
Headings.args = {
  markdown: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`,
};

export const Table = Template.bind({});
Table.args = {
  markdown: `| Column A | Column B | Column C |
| - | - | - |
| Cell A | Cell B | Cell C |
| Cell A | Cell B | Cell C |
| Cell A | Cell B | Cell C |
`,
};
