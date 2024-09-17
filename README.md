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

## Updating Service Detail
In fact, there are no code modification required when services (name and address) need to be updated, unless health check method also need to be updated. 

Please make sure the updated information is correct. Services detail is located in [checks.csv](checks.csv). Columns are explained below as a table.

#### Services Data Values Description
| # | Value Name      | Description                                      | Data Type            | Example Value           |
|---|-----------------|--------------------------------------------------|----------------------|-------------------------|
| 1 | Method          | Health check methods (http / port / ...)         | String               | http                    |
| 2 | Expected Code   | Expected HTTP Status Code (http=200, port=0)     | Number               | 200                     |
| 3 | Service Name    | The name of the service for display              | String               | rVDI                    |
| 4 | Service Address | The actual service address (with port if needed) | String (with Number) | https://rvdi.qut.edu.au |

Values are separated by comma `,`. To update a `Service Name`, just go to [checks.csv](checks.csv), and find third column of the service you would like to update.

Do not delete other records, please also maintain the format of the document to avoid issues, each service uses one line.

## Updating Incidents Records
There are two parts when updating incidents - [Current Incidents](#current-incidents) and [Past Incidents](#past-incidents). Current Incidents contains information of current system(s) outage, while Past Incidents contains the history of system(s) outage.

### Current Incidents
Data for current incident is from [incidents.csv](incidents.csv). There are two formats accepted for different situations. When you open the file, you will either see an empty file means there are no reported ongoing incidents, and if you see date time, system and impact means a specific system is out of service currently.

To update [incidents.csv](incidents.csv), In case any incident happens, remove the line "No ongoing incidents" and replace with the following format (values separated with a comma): 

`PBS Server, PBS service disrupted, 2024-07-02T15:53:42+1000`. 

#### Current Incidents Data Values Descriptions
| # | Value Name   | Description                            | Data Type          | Example Value            |
|---|--------------|----------------------------------------|--------------------|--------------------------|
| 1 | Service Name | Name of the service disrupted          | String             | PBS Server               |
| 2 | Impact       | The impact caused by the outage        | String             | PBS service disrupted    |
| 3 | Reported     | The date and time outage were reported | ISO 8601 Date Time | 2024-07-02T15:53:42+1000 |

**Important Notes:** Please remove current incident records once that service(s) have recovered from the outage to keep the status updated.

After editing, commit your changes, the system will re-build itself and you shall see the updates.

### Past Incidents
Data for past incident is from [past_incidents.csv](past_incidents.csv). When you open the file, you will either see an empty file means there are no past incidents history, and if you see date, system and impact means there are incident(s) happened in the past.

To update [past_incidents.csv](past_incidents.csv) by adding a past incident history, add a new line with the following format (values separated with a comma):

`HPC-FS, Scheduled maintenance, 2024-07-20T11:53:42+1000, 2024-07-21T13:13:42+1000`.

*You can simply copy entries in the [incidents.csv](incidents.csv), then add a comma, and the restored date and time when the service is restored.*

#### Past Incidents Data Values Descriptions
| # | Value Name   | Description                          | Data Type          | Example Value            |
|---|--------------|--------------------------------------|--------------------|--------------------------|
| 1 | Service Name | Name of the service disrupted        | String             | HPC-FS                   |
| 2 | Impact       | The impact caused by the outage      | String             | Scheduled maintenance    |
| 3 | Reported     | The date and time of outage reported | ISO 8601 Date Time | 2024-07-20T11:53:42+1000 |
| 4 | Restored     | The date and time of outage restored | ISO 8601 Date Time | 2024-07-21T13:13:42+1000 |


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
