import type { NextPage } from "next";
import { Box, Link, Stack, StackDivider } from "@chakra-ui/react";
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
import { Footer } from "../components";

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

  const fetchData = async (dataFilePath: string, setData: any) => {
    try {
      const response = await fetch(dataFilePath);
      if (!response.ok) {
        throw new Error(`Error fetching data from ${dataFilePath}!`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Initial fetch
    const fetchAllData = async () => {
      await fetchData("./status.json", setStatusData);
      await fetchData("./incidents.json", setIncidentData);
      await fetchData("./planned_maintenance.json", setPlannedMaintenanceData);
    };

    fetchAllData();

    // Poll every 60 seconds
    const intervalId = setInterval(async () => {
      await fetchData("./status.json", setStatusData);
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
      <Footer>
        <Stack
          p={6}
          direction={{ base: "column", md: "row" }}
          divider={<StackDivider borderColor="gray.200" />}
          spacing={"12px"}
        >
          <Box>
            <abbr title={"Tertiary Education Quality and Standards Agency"}>
              TEQSA
            </abbr>{" "}
            Provider ID{" "}
            <Link
              href={
                "https://www.teqsa.gov.au/provider/queensland-university-technology"
              }
              isExternal
            >
              PRV12079
            </Link>{" "}
            Australian University
          </Box>
          <Box>
            <abbr
              title={
                "Commonwealth Register of Institutions and Courses for Overseas Students"
              }
            >
              CRICOS
            </abbr>{" "}
            No. 00213J
          </Box>
          <Box>
            <abbr title={"Australian Business Number"}>ABN</abbr> 83 791 724 622
          </Box>
        </Stack>
      </Footer>
    </>
  );
};

export default Home;
