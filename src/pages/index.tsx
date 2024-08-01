import type { NextPage } from "next";
import { Stack } from "@chakra-ui/react";
import Head from "next/head";
import site from "../../public/site.json";
import Page from "../components/page/Page";

import { PlannedMaintenance } from "../components/plannedMaintenance";
import { OperationalStatus, Service } from "../components/OperationalStatus";
import { PastIncidents } from "../components/pastIncidents";
import { ServiceStatus } from "../components/OperationalStatus/OperationalStatus";

import statusJsonData from "../../public/status.json";
import incidentsJsonData from "../../public/incidents.json";
import plannedMaintenanceJsonData from "../../public/planned_maintenance.json";

const Home: NextPage = () => {
  const statusData = statusJsonData;
  const incidentsData = incidentsJsonData;
  const plannedMaintenanceData = plannedMaintenanceJsonData;

  return (
    <>
      <Head>
        <title>{site.pageTitle}</title>
        <meta name="description" content="Our Team Charter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page {...site}>
        <Stack spacing={12}>
          {plannedMaintenanceData &&
            plannedMaintenanceData?.planned_maintenance.length > 0 && (
              <PlannedMaintenance
                lastUpdated={""}
                plannedMaintenances={plannedMaintenanceData.planned_maintenance}
              />
            )}
          {incidentsData && incidentsData?.current_incidents.length > 0 && (
            <OperationalStatus
              title={"Service disruptions"}
              lastUpdated={incidentsData?.last_updated}
              services={incidentsData.current_incidents}
            />
          )}
          {statusData && statusData?.services.length > 0 && (
            <OperationalStatus
              title={"Service disruptions"}
              lastUpdated={statusData?.last_updated}
              services={statusData.services as Array<Service>}
              filter={ServiceStatus.FAILURE}
            />
          )}
          {statusData && (
            <OperationalStatus
              title={"Operational status"}
              lastUpdated={statusData?.last_updated}
              services={statusData?.services as Array<Service>}
              filter={ServiceStatus.OK}
            />
          )}
          {incidentsData && incidentsData?.past_incidents.length > 0 && (
            <PastIncidents
              title={"Past incidents"}
              subTitle={"Showing all past incidents"}
              lastUpdated={""}
              incidents={incidentsData.past_incidents}
            />
          )}
        </Stack>
      </Page>
    </>
  );
};

export default Home;
