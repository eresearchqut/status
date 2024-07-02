export default {
  framework: {
    name: "@storybook/nextjs",
  },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@chakra-ui/storybook-addon",
    "storybook-addon-mock",
  ],
  features: {
    emotionAlias: false,
  },
  staticDirs: ["../public"],
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
  },
};
