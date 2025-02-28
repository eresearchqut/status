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
import { isEmptyObject } from "@chakra-ui/utils";

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
  const [incidentsData, setIncidentsData] = useState<IncidentData | null>(null);
  const [plannedMaintenanceData, setPlannedMaintenanceData] =
    useState<PlannedMaintenanceData | null>(null);
  const [allIncidents, setAllIncidents] = useState<IncidentData | null>(null);
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchData = async (dataFilePath: string, signal: AbortSignal) => {
    try {
      const response = await fetch(dataFilePath, { signal });
      if (!response.ok) {
        console.error(
          `Error fetching data from ${dataFilePath}: ${response.status}`
        );
        return null;
      }
      return await response.json();
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
      return null;
    }
  };

  const setStatusAndAllIncidentsData = (
    status: StatusData,
    incidents: IncidentData | null
  ) => {
    const nonIncidentServices =
      status.services.filter(
        (service: Service) =>
          !(incidents?.current_incidents ?? [])
            .map((incident: Service) => incident.name)
            .includes(service.name)
      ) ?? [];
    const failedServices = nonIncidentServices.filter(
      (service: Service) => service.status === "FAILURE"
    );
    setStatusData({
      ...status,
      services: nonIncidentServices,
    });
    setAllIncidents(
      incidents
        ? {
            ...incidents,
            current_incidents: [
              ...failedServices,
              ...incidents?.current_incidents,
            ],
          }
        : {
            last_updated: status.last_updated,
            current_incidents: failedServices,
            past_incidents: [],
          }
    );
  };

  useEffect(() => {
    // Initial fetch
    const fetchAllData = (signal: AbortSignal) =>
      Promise.all(
        ["status", "incidents", "planned_maintenance"].map((fileName) =>
          fetchData(`./${fileName}.json`, signal).then((fetchedData) => {
            return { [fileName]: fetchedData ?? {} };
          })
        )
      ).then((result) =>
        result.reduce((acc, current) => ({ ...acc, ...current }), {})
      );

    fetchAllData(signal).then((data) => {
      if (data && !isEmptyObject(data)) {
        setPlannedMaintenanceData(data.planned_maintenance);
        setIncidentsData(data.incidents);
        setStatusAndAllIncidentsData(data.status, data.incidents);
      }
      setIsInitialDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isInitialDataLoaded) return;
    // Poll every 60 seconds
    const intervalId = setInterval(() => {
      fetchData("./status.json", signal).then((data) => {
        setStatusAndAllIncidentsData(data, incidentsData);
      });
    }, 60000);

    return () => {
      // Clean up interval on component unmount
      clearInterval(intervalId);
      // Abort the fetch request if the component unmounts
      controller.abort();
    };
  }, [isInitialDataLoaded, incidentsData]);

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
          {allIncidents && allIncidents?.current_incidents?.length > 0 && (
            <OperationalStatus
              title={"Service disruptions"}
              lastUpdated={allIncidents?.last_updated}
              services={allIncidents.current_incidents}
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
