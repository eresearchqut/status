import type { NextPage } from "next";
import { Stack } from "@chakra-ui/react";
import Head from "next/head";
import site from "../../public/site.json";
import Page from "../components/page/Page";

import { PlannedMaintenance } from "../components/plannedMaintenance";
import { OperationalStatus, Service } from "../components/operationalStatus";
import { PastIncidents } from "../components/pastIncidents";
import { ServiceStatus } from "../components/operationalStatus/OperationalStatus";

import incidentsJsonData from "../../public/incidents.json";
import plannedMaintenanceJsonData from "../../public/planned_maintenance.json";
import { useEffect, useState } from "react";

interface StatusData {
  last_updated: string;
  services: Service[];
}

const Home: NextPage = () => {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const incidentsData = incidentsJsonData;
  const plannedMaintenanceData = plannedMaintenanceJsonData;

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await fetch("./status.json");
        if (!response.ok) {
          console.error("Network response was not ok");
        }
        const data = await response.json();
        setStatusData(data);
      } catch (error) {
        console.error(error);
      }
    };
    // Initial fetch
    fetchStatusData();

    // Poll every 60 seconds
    const intervalId = setInterval(async () => {
      await fetchStatusData();
    }, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
