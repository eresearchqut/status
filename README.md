# eResearch Service Status Page
This Service Status Page provides real-time updates and historical data about the operational status of services and systems within the project. It is designed to ensure transparency and enhance user trust by displaying the current status of services, maintenance schedules, and incident reports.

## Features & Components

### Features
- Service Monitoring: Displays the real-time status (operational or disrupted) of each service.
- Incident Reporting: Lists active and resolved incidents with detailed information.
- Maintenances Notifications: Highlights scheduled maintenance windows and their expected impact.
- Historical Data: Tracks past incidents and maintenance for audit and review purposes.
- Feedback / Contact Us: For users to provide feedback or contact eResearch Team if any questions.

### Components

- Operational status - Displays operational services, if all services are operational, you will see a green banner `All systems are operational`.
  
  ![image](https://github.com/user-attachments/assets/d4f824bd-410c-4ff7-82c5-47d47934d06e)

- Service disruptions - Displays disrupted services with reported time and impact, only shows when there is at least one disrupted services.

  ![image](https://github.com/user-attachments/assets/d06ea209-c70f-4ab3-8b80-febebbd2e242)

- Planned maintenances - Displays scheduled maintenances and relevant services that will be affected in the next two weeks.

  ![image](https://github.com/user-attachments/assets/0384065b-2669-49e6-831d-2e1031e0367e)

- Past incidents - Displays all past incidents and affected services.

  ![image](https://github.com/user-attachments/assets/e9123fab-ad2c-49de-bd02-f84818076d44)

## Host Location

[https://status.eres.qut.edu.au/](https://status.eres.qut.edu.au/) 

(Requires VPN if you are connected from external)

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

## Run with Docker Compose

You can run the application locally using Docker Compose. The compose file supports an optional "analytics" profile that brings up Umami analytics, PostgreSQL, and pgAdmin alongside the status app.

Prerequisites:
- Docker and Docker Compose v2

Environment (optional):
- You may create a `.env` file in the project root to override defaults used by `docker-compose.yml` (e.g. `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `PGADMIN_PORT`, `UMAMI_URL`, `UMAMI_ID`). If not provided, sensible defaults are used.

Option A — Status app only:
- Start: `docker compose up --build`
- Open: http://localhost:8080

Option B — Status app with analytics stack (Umami + Postgres + pgAdmin):
- Start: `docker compose --profile analytics up --build`
- Status app: http://localhost:8080
- Umami: http://localhost:3000 Default credentials admin, umami
- pgAdmin: http://localhost:5433 (defaults: email `admin@pgadmin.com`, password `password` — configurable via `.env`)

To stop containers, press Ctrl+C in the terminal or run `docker compose down` (add `--volumes` to remove the Postgres volume).

## Commands

- `yarn run dev` - Starts the development server.
- `yarn run test` - Runs the unit tests.
- `yarn run storybook` - Starts the Storybook UI.
- `yarn run lint` - Runs ESLint on the project.
- `yarn run format:fix` - Formats code for the entire project

### Storybook's Accessibility testing

This starter kit comes with the `@storybook/addon-a11y` which is used to check for common accessibility errors in your components. When you run `yarn run storybook`, each story will show detailed explanations with suggested fixes if errors are found.


## Automated Scripts
It is always beneficial to understand how the information are updated and displayed, reduce the possibility of causing issues or errors when [updating service detail](#updating-service-detail).

Scripts are either executed automatically when the build action is triggered by commit and push, or time interval based.

### List of scripts
- [incidents.sh](./incidents.sh) - Updates current and past incidents. Executes when either [incidents.csv](./incidents.csv) or [past_incidents.csv](./past_incidents.csv) is updated.
- [status.sh](./status.sh) - Updates service list in operational status, detects if service is down by using basic http or port. Executes every 60 seconds.
- [planned_maintenance.sh](./planned_maintenance.sh) - Updates planned maintenances component. Executes when [planned_maintenance.csv](./planned_maintenance.csv) is updated.
- [startup.sh](./startup.sh) - Executes when new build action is triggered by commit and push. Calls 3 scripts above and setup a 60 seconds update interval for [status.sh](./status.sh).

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

#### Services Under Monitoring
| # | Service Name     |
|---|------------------|
| 1 | eResearch Portal |
| 2 | rVDI             |
| 3 | XNAT             |
| 4 | Jupyter Hub      |
| 5 | HPC Lyra         |
| 6 | HPC Aqua         |
| 7 | HPC-FS           |
| 8 | RDSS             |

## Updating Incidents Records - unplanned outages only
There are two parts when updating incidents - [Current Incidents](#current-incidents) and [Past Incidents](#past-incidents). Current Incidents contains information of current system(s) outage, while Past Incidents contains the history of system(s) outage. Note: planned maintenance should not become current incidents or past incidents, they should stay as planned maintenance for the duration and be removed after the planned maintenance is over.

### Current Incidents
Data for current incident is from [incidents.csv](incidents.csv). There are two formats accepted for different situations. When you open the file, you will either see an empty file means there are no reported ongoing incidents, and if you see date time, system and impact means a specific system is out of service currently.

To update [incidents.csv](incidents.csv), In case any incident happens, remove the line "No ongoing incidents" and replace with the following format (values separated with a comma): 

`eResearch Portal, eResearch Portal disrupted, 2024-07-02T15:53:42+1000`. 
> **CAUTION:** To ensure accurate incident tracking, it is important that incident names align with the names of associated services. [Services Under Monitoring](#services-under-monitoring)

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
When adding planned maintenance events, edit [planned_maintenance.csv](planned_maintenance.csv) and add a new row with the following format (values separated with a comma): `HPC-FS, 2024-01-31T09:00:00+1000, 2024-01-31T12:00:00+1000, Service will be unavailable`. If the planned maintenance event goes on for substantially longer than initially planned due to unforeseen circumstances, just update column 3 (Date & Time To).

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
