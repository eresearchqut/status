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
} from "@chakra-ui/react";

interface Incident {
  reported: string;
  reason: string;
}

export interface PastIncidentsProps {
  title: string;
  subTitle: string;
  lastUpdated: string;
  incidents: Incident[];
}

export const PastIncidents: FunctionComponent<PastIncidentsProps> = ({
  title,
  subTitle,
  lastUpdated = "",
  incidents = [],
}) => {
  if (incidents.length === 0) return null;

  return (
    <Box>
      <Flex direction="column" px={6} py={4}>
        <Text as="b" fontSize="3xl">
          {title}
        </Text>
        <Text fontSize="1xl">{subTitle}</Text>
        {lastUpdated !== "" && (
          <Text fontSize="1x1">Last Updated: {lastUpdated}</Text>
        )}
      </Flex>
      <TableContainer>
        <Table>
          <Tbody>
            {incidents.map((incident: any, index: number) => (
              <Tr key={index}>
                <Td>
                  <Text fontSize="2xl" as="b">
                    {incident?.reported}
                  </Text>
                  <Text fontSize="1xl" my={2}>
                    {incident?.reason}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PastIncidents;
