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
import { PlannedMaintenanceItem } from "../plannedMaintenance";

export enum ServiceStatus {
  OK = "OK",
  FAILURE = "FAILURE",
}

export interface Service {
  name: string;
  impact?: string;
  reported?: string;
  status: ServiceStatus;
  error?: string;
}

export interface OperationalStatusProps {
  title: string;
  lastUpdated: string;
  services: Service[];
  maintenances?: PlannedMaintenanceItem[];
  filter?: ServiceStatus;
}

export const OperationalStatus: FunctionComponent<OperationalStatusProps> = ({
  title,
  services = [],
  maintenances = null,
  filter,
}) => {
  const filteredData = filter
    ? services.filter((service) => service.status === filter)
    : services;

  const isServiceInMaintenanceNow = (service: Service) => {
    const serviceInMaintenance =
      maintenances &&
      maintenances.find(
        (maintenance: PlannedMaintenanceItem) =>
          maintenance.service.toLowerCase() === service.name.toLowerCase()
      );

    if (!serviceInMaintenance) return false;

    const maintenanceFrom = new Date(serviceInMaintenance.date_time_from);
    const maintenanceTo = new Date(serviceInMaintenance.date_time_to);
    const currentTime = new Date();
    return currentTime >= maintenanceFrom && currentTime <= maintenanceTo;
  };

  const hasDisruptedService = services?.some(
    (service: any) => service?.status !== ServiceStatus.OK
  );

  const noDisruptedService = !hasDisruptedService;

  const convertDate = (isoDate: string) =>
    `${new Date(isoDate).toLocaleTimeString("en-AU")} ${new Date(isoDate).toLocaleDateString("en-AU")}`;

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
              {hasDisruptedService && <Th>Reported</Th>}
              {hasDisruptedService && <Th>Impact</Th>}
              <Th isNumeric>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map(
              (service: any) =>
                !isServiceInMaintenanceNow(service) && (
                  <Tr key={service?.name}>
                    <Td>{service?.name}</Td>
                    {hasDisruptedService && (
                      <Td>
                        {service?.reported != null
                          ? convertDate(service?.reported)
                          : "Unknown"}
                      </Td>
                    )}
                    {hasDisruptedService && (
                      <Td>
                        {service?.impact != null ? service?.impact : "Unknown"}
                      </Td>
                    )}
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
                )
            )}
          </Tbody>
        </Table>
      )}
    </Stack>
  );
};

export default OperationalStatus;
