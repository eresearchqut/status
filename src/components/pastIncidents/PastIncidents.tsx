import React, { FunctionComponent, useState } from "react";
import { Text, Stack, Heading, StackDivider, Button } from "@chakra-ui/react";

export interface Incident {
  name: string;
  impact: string;
  reported: string;
  restored?: string;
}

export interface PastIncidentsProps {
  title: string;
  incidents: Incident[];
}

export const PastIncidents: FunctionComponent<PastIncidentsProps> = ({
  title,
  incidents = [],
}) => {
  const [showAllPastIncidents, setShowAllPastIncidents] = useState(false);

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  let filteredIncidents = incidents.filter(
    (incident) => new Date(incident.reported) >= threeMonthsAgo
  );

  if (filteredIncidents.length === 0 && incidents.length > 0) {
    filteredIncidents = incidents.slice(0, 6);
  }

  const displayedIncidents = showAllPastIncidents
    ? incidents
    : filteredIncidents;
  const hasHiddenIncidents = incidents.length > filteredIncidents.length;

  const dynamicSubTitle = showAllPastIncidents
    ? "Showing all past incidents"
    : "Showing recent past incidents";

  const convertDateStr = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text>{dynamicSubTitle}</Text>
        <Stack spacing={2} divider={<StackDivider borderColor="gray.200" />}>
          {displayedIncidents.length === 0 ? (
            <Text>No incidents reported.</Text>
          ) : (
            displayedIncidents.map((incident: any, index: number) => (
              <Stack spacing={2} key={index}>
                <Heading as="h4" size="sm">
                  {convertDateStr(incident?.reported)} -{" "}
                  {convertDateStr(incident?.restored)}
                </Heading>
                <Text>
                  {incident?.name} - {incident?.impact}
                </Text>
              </Stack>
            ))
          )}
        </Stack>
      </Stack>
      {hasHiddenIncidents && !showAllPastIncidents && (
        <Button onClick={() => setShowAllPastIncidents(true)} variant="outline">
          Show more
        </Button>
      )}
      {hasHiddenIncidents && showAllPastIncidents && (
        <Button
          onClick={() => setShowAllPastIncidents(false)}
          variant="outline"
        >
          Show less
        </Button>
      )}
    </Stack>
  );
};

export default PastIncidents;
