import React, {FunctionComponent} from "react";
import {Heading, Stack, StackDivider, Text,} from "@chakra-ui/react";

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

    <Stack spacing={2}>
      <Heading as={"h3"}>
        {title}
      </Heading>
      <Text>{subTitle}</Text>
      <Stack spacing={2} divider={<StackDivider borderColor='gray.200'/>}>
        {incidents.map((incident: any, index: number) => (
          <Stack spacing={2}>
            <Heading as={"h4"} size={"lg"}>
              {new Date(incident.reported).toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: "numeric"
              })}
            </Heading>
            <Text>
              {incident.reason}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default PastIncidents;
