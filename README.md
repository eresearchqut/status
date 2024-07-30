# eResearch Team Charter

## Overview

https://eresearchqut.github.io/team-charter/

## Stack

- [Next.js 13](https://nextjs.org/blog/next-13)
- [Chakra UI](https://chakra-ui.com/)
- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## Setup

- `yarn install` - Install the node dependencies.

## Commands

- `yarn run dev` - Starts the development server.
- `yarn run test` - Runs the unit tests.
- `yarn run storybook` - Starts the Storybook UI.
- `yarn run lint` - Runs ESLint on the project.
- `yarn run format:fix` - Formats code for the entire project

### Storybook's Accessibility testing

This starter kit comes with the `@storybook/addon-a11y` which is used to check for common accessibility errors in your components. When you run `yarn run storybook`, each story will show detailed explanations with suggested fixes if errors are found.

## Updating Incidents Records
There are two parts when updating incidents - [Current Incidents](#current-incidents) and [Past Incidents](#past-incidents). Current Incidents contains information of current system(s) outage, while Past Incidents contains the history of system(s) outage.

### Current Incidents
Data for current incident is from [incidents.csv](incidents.csv). There are two formats accepted for different situations. When you open the file, you will either see "No ongoing incidents" means there are no reported incidents currently, and if you see date time, system and reason means a specific system is out of service currently.

To update [incidents.csv](incidents.csv), In case any incident happens, remove the line "No ongoing incidents" and replace with the following format (values separated with a comma): `PBS Server, 2024-07-02T15:53:42+1000, Disrupted`. 

After editing, commit your changes, the system will re-build itself and you shall see the updates.

### Past Incidents
Data for past incident is from [past_incidents.csv](past_incidents.csv). When you open the file, you will either see an empty file means there are no past incidents history, and if you see date, system and reason means there are incidents happened in the past.

To update [past_incidents.csv](past_incidents.csv), if the file is empty and you want to add a history, add a line with the following format (values separated with a comma): `2024-07-20, HPC-FS, scheduled maintenance`.

After editing, commit your changes, the system will re-build itself and you shall see the updates.
