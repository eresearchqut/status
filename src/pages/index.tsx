import type { NextPage } from "next";
import { Stack } from "@chakra-ui/react";
import Head from "next/head";
import site from "../../public/site.json";
import Page from "../components/page/Page";

import {
  PlannedMaintenance,
  PlannedMaintenanceItem,
} from "../components/plannedMaintenance";
import { OperationalStatus, Service } from "../components/operationalStatus";
import { PastIncidents, Incident } from "../components/pastIncidents";
import { ServiceStatus } from "../components/operationalStatus/OperationalStatus";

import { useEffect, useState } from "react";

interface StatusData {
  last_updated: string;
  services: Service[];
}

interface IncidentData {
  last_updated: string;
  current_incidents: Service[];
  past_incidents: Incident[];
}

interface PlannedMaintenanceData {
  last_updated: string;
  planned_maintenance: PlannedMaintenanceItem[];
}

const Home: NextPage = () => {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [incidentsData, setIncidentData] = useState<IncidentData | null>(null);
  const [plannedMaintenanceData, setPlannedMaintenanceData] =
    useState<PlannedMaintenanceData | null>(null);

  const fetchData = async (
    dataFilePath: string,
    signal: AbortSignal,
    setData: any
  ) => {
    try {
      const response = await fetch(dataFilePath, { signal });
      if (!response.ok) {
        throw new Error(
          `Error fetching data from ${dataFilePath}: ${response.status}`
        );
      }
      const data = await response.json();
      setData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.log(`Fetch aborted for ${dataFilePath}`);
        } else {
          console.error("Error: ", error);
        }
      } else {
        console.error("Unknown error occurred: ", error);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Initial fetch
    const fetchAllData = (signal: AbortSignal) => {
      fetchData("./status.json", signal, setStatusData);
      fetchData("./incidents.json", signal, setIncidentData);
      fetchData(
        "./planned_maintenance.json",
        signal,
        setPlannedMaintenanceData
      );
    };

    fetchAllData(signal);

    // Poll every 60 seconds
    const intervalId = setInterval(async () => {
      await fetchData("./status.json", signal, setStatusData);
    }, 60000);

    return () => {
      // Clean up interval on component unmount
      clearInterval(intervalId);
      // Abort the fetch request if the component unmounts
      controller.abort();
    };
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
            plannedMaintenanceData?.planned_maintenance?.length > 0 && (
              <PlannedMaintenance
                lastUpdated={""}
                plannedMaintenances={plannedMaintenanceData.planned_maintenance}
              />
            )}
          {incidentsData && incidentsData?.current_incidents?.length > 0 && (
            <OperationalStatus
              title={"Service disruptions"}
              lastUpdated={incidentsData?.last_updated}
              services={incidentsData.current_incidents}
              filter={ServiceStatus.FAILURE}
            />
          )}
          {statusData && statusData?.services?.length > 0 && (
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
              maintenances={plannedMaintenanceData?.planned_maintenance}
              filter={ServiceStatus.OK}
            />
          )}
          {incidentsData && incidentsData?.past_incidents?.length > 0 && (
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
