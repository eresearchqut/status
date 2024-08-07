import React, { FunctionComponent } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  TagLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  Heading,
  Stack,
} from "@chakra-ui/react";

export enum ServiceStatus {
  OK = "OK",
  FAILURE = "FAILURE",
}

export interface Service {
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
  filter,
}) => {
  const filteredData = filter
    ? services.filter((service) => service.status === filter)
    : services;

  const hasDisruptedService = services?.some(
    (service: any) => service?.status !== ServiceStatus.OK
  );

  const noDisruptedService = !hasDisruptedService;

  if (filteredData.length === 0) return null;

  return (
    <Stack spacing={2}>
      <Heading as="h3">{title}</Heading>
      {filter === ServiceStatus.FAILURE && hasDisruptedService && (
        <Alert status="error" variant="solid">
          <AlertIcon />
          <AlertTitle>
            The following systems have service disruptions
          </AlertTitle>
        </Alert>
      )}
      {noDisruptedService && (
        <Alert status="success" variant="solid">
          <AlertIcon />
          <AlertTitle>All systems are operational</AlertTitle>
        </Alert>
      )}
      {filter === ServiceStatus.OK && hasDisruptedService && (
        <Alert status="success" variant="solid">
          <AlertIcon />
          <AlertTitle>The following systems are operational</AlertTitle>
        </Alert>
      )}
      {filteredData && filteredData.length > 0 && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Service</Th>
              {hasDisruptedService && <Th>Detected</Th>}
              <Th isNumeric>Status</Th>
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
                      {service?.status === "OK" ? "Operational" : "Disrupted"}
                    </TagLabel>
                  </Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Stack>
  );
};

export default OperationalStatus;
