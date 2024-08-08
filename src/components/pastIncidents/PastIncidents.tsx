import React, { FunctionComponent } from "react";
import { Text, Stack, Heading, StackDivider } from "@chakra-ui/react";

export interface Incident {
  date: string;
  service: string;
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

  const convertDateStr = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const convertDateTimeStr = (isoDate: string) =>
    `${new Date(isoDate).toLocaleTimeString("en-AU")} ${new Date(isoDate).toLocaleDateString("en-AU")}`;

  return (
    <Stack spacing={2}>
      <Heading as="h3">{title}</Heading>
      <Text>{subTitle}</Text>
      <Stack spacing={2} divider={<StackDivider borderColor="gray.200" />}>
        {incidents.map((incident: any, index: number) => (
          <Stack spacing={2} key={index}>
            <Heading as="h4" fontSize="2xl">
              {convertDateStr(incident?.date)}
            </Heading>
            <Text>
              {incident?.service} - {incident?.reason}
            </Text>
          </Stack>
        ))}
      </Stack>
      {lastUpdated !== "" && (
        <Text>Last Updated: {convertDateTimeStr(lastUpdated)}</Text>
      )}
    </Stack>
  );
};

export default PastIncidents;
