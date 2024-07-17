import React, { FunctionComponent } from "react";
import {
  Text,
  Flex,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Thead,
  AlertIcon,
  AlertTitle,
  Alert,
} from "@chakra-ui/react";

interface PlannedMaintenance {
  service: string;
  from: string;
  to: string;
  impact: string;
}

export interface PlannedMaintenanceProps {
  lastUpdated: string;
  plannedMaintenances: PlannedMaintenance[];
}

export const PlannedMaintenance: FunctionComponent<PlannedMaintenanceProps> = ({
  lastUpdated = "",
  plannedMaintenances = [],
}) => {
  if (plannedMaintenances.length === 0) return null;

  const convertDate = (dateStr: string) => {
    const date = new Date(dateStr);

    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, "0");

    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${formattedHours}:${minutes}${ampm} ${day}/${month}/${year}`;
  };

  return (
    <Box>
      <Flex direction="column" px={6} py={4}>
        <Text as="b" fontSize="3xl">
          Planned maintenance
        </Text>
        {lastUpdated !== "" && (
          <Text fontSize="1x1">Last Updated: {convertDate(lastUpdated)}</Text>
        )}
        <Alert status="info" variant="solid">
          <AlertIcon />
          <AlertTitle>
            The following systems have maintenance planned in the next two weeks
          </AlertTitle>
        </Alert>
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Td>
                <Text as="b">SERVICE</Text>
              </Td>
              <Td>
                <Text as="b">PLANNED FROM</Text>
              </Td>
              <Td>
                <Text as="b">PLANNED TO</Text>
              </Td>
              <Td>
                <Text as="b">IMPACT</Text>
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {plannedMaintenances.map((maintenance: any, index: number) => (
              <Tr key={index}>
                <Td>{maintenance?.service}</Td>
                <Td>{convertDate(maintenance?.from)}</Td>
                <Td>{convertDate(maintenance?.to)}</Td>
                <Td>{maintenance?.impact}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlannedMaintenance;
