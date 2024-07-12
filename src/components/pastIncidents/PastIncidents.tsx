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
  datetime_reported: string;
  reason: string;
}

interface Data extends Incident {
  last_updated?: string;
  incidents: Incident[];
}

export interface PastIncidentsData extends Data {
  title: string;
  subTitle: string;
  data?: Data;
}

export const PastIncidents: FunctionComponent<PastIncidentsData> = ({
  title,
  subTitle,
  data,
}) => {
  return (
    <Box>
      <Flex direction="column" px={6} py={4}>
        <Text as="b" fontSize="3xl">
          {title}
        </Text>
        <Text fontSize="1xl">{subTitle}</Text>
      </Flex>
      <TableContainer>
        <Table>
          <Tbody>
            {data && data?.incidents.length > 0 ? (
              data.incidents.map((incident: any, index: number) => (
                <Tr key={index}>
                  <Td>
                    <Text fontSize="2xl" as="b">
                      {incident?.datetime_reported}
                    </Text>
                    <Text fontSize="1xl" my={2}>
                      {incident?.reason}
                    </Text>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr></Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PastIncidents;
