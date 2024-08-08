# eResearch Team Charter

## Overview

https://eresearchqut.github.io/status/

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

#### Current Incidents Data Values Descriptions
| # | Value Name   | Description                                               | Data Type          | Example Value            |
|---|--------------|-----------------------------------------------------------|--------------------|--------------------------|
| 1 | Service Name | Name of the service disrupted                             | String             | PBS Server               |
| 2 | Reported     | The date and time outage were reported                    | ISO 8601 Date Time | 2024-07-02T15:53:42+1000 |
| 3 | Status       | The current status of the service, only `FAILURE` allowed | String             | FAILURE                  |

**Important Notes:** Please remove current incident records once that service(s) have recovered from the outage to keep the status updated.

After editing, commit your changes, the system will re-build itself and you shall see the updates.

### Past Incidents
Data for past incident is from [past_incidents.csv](past_incidents.csv). When you open the file, you will either see an empty file means there are no past incidents history, and if you see date, system and reason means there are incidents happened in the past.

To update [past_incidents.csv](past_incidents.csv), if the file is empty and you want to add a history, add a line with the following format (values separated with a comma): `2024-07-20, HPC-FS, scheduled maintenance`.

#### Past Incidents Data Values Descriptions
| # | Value Name   | Description                     | Data Type     | Example Value         |
|---|--------------|---------------------------------|---------------|-----------------------|
| 1 | Date         | The date of outage reported     | ISO 8601 Date | 2024-07-20            |
| 2 | Service Name | Name of the service disrupted   | String        | HPC-FS                |
| 3 | Reason       | The cause/reason for the outage | String        | scheduled maintenance |


After editing, commit your changes, the system will re-build itself and you shall see the updates.

## Updating Planned Maintenance Events
When adding planned maintenance events, edit [planned_maintenance.csv](planned_maintenance.csv) and add a new row with the following format (values separated with a comma): `HPC-FS, 2024-01-31T09:00:00+1000, 2024-01-31T12:00:00+1000, Service will be unavailable`.

#### Planned Maintenance Data Values Descriptions
| # | Value Name       | Description                                        | Data Type          | Example Value               |
|---|------------------|----------------------------------------------------|--------------------|-----------------------------|
| 1 | Service Name     | Name of the service will be affected               | String             | HPC-FS                      |
| 2 | Date & Time From | The date and time when this maintenance starts     | ISO 8601 Date Time | 2024-01-31T09:00:00+1000    |
| 3 | Date & Time To   | The date and time when this maintenance finishes   | ISO 8601 Date Time | 2024-01-31T12:00:00+1000    |
| 4 | Impact           | The impact(s) will be caused from this maintenance | String             | Service will be unavailable |

**Important Notes:**
- The finishing time of the maintenance must be after the starting time. Please perform a sanity check when editing.
- Please remove events that are finished or expired to keep the status updated.

After editing, commit your changes, the system will re-build itself and you shall see the updates.
