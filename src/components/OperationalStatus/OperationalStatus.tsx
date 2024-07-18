import React, { FunctionComponent } from "react";
import {
  Text,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
  TagLabel,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

export enum ServiceStatus {
  OK = "OK",
  FAILURE = "FAILURE",
}

interface Service {
  name: string;
  status: ServiceStatus;
  detected?: string;
  error?: string;
}

export interface OperationalStatusProps {
  title: string;
  lastUpdated: string;
  services: Service[];
  filter?: ServiceStatus;
}

export const OperationalStatus: FunctionComponent<OperationalStatusProps> = ({
  title,
  services = [],
  filter = ServiceStatus.OK,
}) => {
  const filteredData = filter
    ? services.filter((service) => service.status === filter)
    : services;

  const hasDisruptedService = filteredData?.some(
    (service: any) => service?.status !== ServiceStatus.OK
  );

  if (filteredData.length === 0) return null;

  return (
    <Box>
      <Flex direction="column" px={6} py={4}>
        <Text as="b" fontSize="3xl">
          {title}
        </Text>
        {hasDisruptedService && (
          <Alert status="error" variant="solid">
            <AlertIcon />
            <AlertTitle>
              The following systems have service disruptions
            </AlertTitle>
          </Alert>
        )}
        {filteredData && filteredData.length > 0 ? (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>SERVICE</Th>
                  {hasDisruptedService && <Th>DETECTED</Th>}
                  <Th isNumeric>STATUS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((service: any) => (
                  <Tr key={service?.name}>
                    <Td>{service?.name}</Td>
                    {hasDisruptedService && <Td>{service?.detected}</Td>}
                    <Td isNumeric>
                      <Tag
                        variant="subtle"
                        colorScheme={service?.status === "OK" ? "green" : "red"}
                      >
                        <TagLabel>
                          {service?.status === "OK"
                            ? "Operational"
                            : "Disrupted"}
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
      </Flex>
    </Box>
  );
};

export default OperationalStatus;
