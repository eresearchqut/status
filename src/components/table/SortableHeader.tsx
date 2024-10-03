import React, { FunctionComponent } from "react";
import { Text, Flex, Th } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

export interface SortableHeaderProps {
  columnName: string;
  sort: { key: string; direction: "ascending" | "descending" };
  sortName: string;
  onSortChange: (key: string) => void;
}

export const SortableHeader: FunctionComponent<SortableHeaderProps> = ({
  columnName,
  sort,
  sortName,
  onSortChange,
}) => {
  const handleSortChange = () => {
    onSortChange(sortName);
  };
  return (
    <Th>
      <Flex align="center">
        <Text cursor="pointer" userSelect="none" onClick={handleSortChange}>
          {columnName}
        </Text>
        {sort.key === sortName ? (
          sort.direction == "ascending" ? (
            <ArrowUpIcon boxSize={4} ml={2} />
          ) : (
            <ArrowDownIcon boxSize={4} ml={2} />
          )
        ) : null}
      </Flex>
    </Th>
  );
};

export default SortableHeader;
