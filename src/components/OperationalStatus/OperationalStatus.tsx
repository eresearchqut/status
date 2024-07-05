import React, { FunctionComponent } from "react";
import {
  Text,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

interface Service {
  name: string;
  status: string;
  error?: string;
}

interface Data extends Service {
  last_updated?: string;
  services: Service[];
}

export interface OperationalStatusData extends Data {
  data?: Data;
}

export const OperationalStatus: FunctionComponent<OperationalStatusData> = ({
  data,
}) => {
  return (
    <Box>
      <Text as="b" fontSize="3xl">
        Operational status
      </Text>
      {data && data?.services.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>SERVICE</Th>
                <Th isNumeric>STATUS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.services.map((service: any) => (
                <Tr key={service?.name}>
                  <Td>{service?.name}</Td>
                  <Td isNumeric>
                    <Tag
                      variant="subtle"
                      colorScheme={service?.status === "OK" ? "green" : "red"}
                    >
                      <TagLabel>
                        {service?.status === "OK" ? "Operational" : "Disrupted"}
                      </TagLabel>
                    </Tag>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text>No Data available.</Text>
      )}
    </Box>
  );
};

export default OperationalStatus;
