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
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface Service {
  name: string;
  status: string;
  detected?: string;
  error?: string;
}

interface Data extends Service {
  last_updated?: string;
  services: Service[];
}

export interface OperationalStatusProps extends Data {
  title: string;
  data?: Data;
  displayOKOnly: boolean;
  displayDisruptedOnly: boolean;
}

export const OperationalStatus: FunctionComponent<OperationalStatusProps> = ({
  title,
  data,
  displayOKOnly = false,
  displayDisruptedOnly = false,
}) => {
  const filteredData = displayOKOnly
    ? data?.services.filter((service: any) => service?.status === "OK")
    : displayDisruptedOnly
      ? data?.services.filter((service: any) => service?.status !== "OK")
      : data?.services;

  const hasDisruptedService = (data: any) => {
    return data?.services.some((service: any) => service?.status !== "OK");
  };

  return (
    <Box>
      <Text as="b" fontSize="3xl">
        {title}
      </Text>
      {displayDisruptedOnly && hasDisruptedService(data) && (
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
                {!displayOKOnly && hasDisruptedService(data) && (
                  <Th>DETECTED</Th>
                )}
                <Th isNumeric>STATUS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((service: any) => (
                <Tr key={service?.name}>
                  <Td>{service?.name}</Td>
                  {!displayOKOnly && hasDisruptedService(data) && (
                    <Td>{service?.detected}</Td>
                  )}
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
