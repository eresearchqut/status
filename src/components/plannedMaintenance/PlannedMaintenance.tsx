import React, { FunctionComponent } from "react";
import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Thead,
  AlertIcon,
  AlertTitle,
  Alert,
  TableCaption,
  Stack,
} from "@chakra-ui/react";

export interface PlannedMaintenanceItem {
  service: string;
  date_time_from: string;
  date_time_to: string;
  impact: string;
}

export interface PlannedMaintenanceProps {
  lastUpdated: string;
  plannedMaintenances: PlannedMaintenanceItem[];
}

export const PlannedMaintenance: FunctionComponent<PlannedMaintenanceProps> = ({
  lastUpdated = "",
  plannedMaintenances = [],
}) => {
  if (plannedMaintenances.length === 0) return null;

  const convertDate = (isoDate: string) =>
    `${new Date(isoDate).toLocaleTimeString("en-AU")} ${new Date(isoDate).toLocaleDateString("en-AU")}`;

  return (
    <Stack spacing={2}>
      <Heading as="h3">Planned maintenance</Heading>
      <Alert status="info" variant="solid">
        <AlertIcon />
        <AlertTitle>
          The following systems have maintenance planned in the next two weeks
        </AlertTitle>
      </Alert>
      <Table>
        <Thead>
          <Tr>
            <Th>Service</Th>
            <Th>Planned from</Th>
            <Th>Planned to</Th>
            <Th>Impact</Th>
          </Tr>
        </Thead>
        <Tbody>
          {plannedMaintenances.map((maintenance: any, index: number) => (
            <Tr key={index}>
              <Td>{maintenance?.service}</Td>
              <Td>{convertDate(maintenance?.date_time_from)}</Td>
              <Td>{convertDate(maintenance?.date_time_to)}</Td>
              <Td>{maintenance?.impact}</Td>
            </Tr>
          ))}
        </Tbody>
        {lastUpdated !== "" && (
          <TableCaption>Last Updated: {convertDate(lastUpdated)}</TableCaption>
        )}
      </Table>
    </Stack>
  );
};

export default PlannedMaintenance;
