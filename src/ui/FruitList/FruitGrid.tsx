import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TableSortLabelOwnProps,
} from "@mui/material";
import React, { useState } from "react";
import { visuallyHidden } from "@mui/utils";
import { Fruit, GroupByKey, GroupedFruits } from "../../lib/definitions";
import { groupByList } from "../../lib/constants";

function descendingComparator(a: Fruit, b: Fruit) {
  if (b.nutritions.calories < a.nutritions.calories) {
    return -1;
  }
  if (b.nutritions.calories > a.nutritions.calories) {
    return 1;
  }
  return 0;
}

function getComparator(
  order: TableSortLabelOwnProps["direction"]
): (a: Fruit, b: Fruit) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b)
    : (a, b) => -descendingComparator(a, b);
}

const groupFruits = (fruits: Fruit[]) => {
  const groupedFruits: GroupedFruits = { family: {}, genus: {}, order: {} };

  groupByList.forEach((groupBy) => {
    groupedFruits[groupBy] = fruits.reduce((acc, fruit) => {
      const groupKey = fruit[groupBy].trim();
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(fruit);
      return acc;
    }, {} as NonNullable<GroupedFruits[GroupByKey]>);
  });
  return groupedFruits;
};

interface FruitGridProps {
  fruits: Fruit[];
  groupBy: GroupByKey | "none";
  onAddToJar: (fruit: Fruit) => void;
}

const FruitGrid: React.FC<FruitGridProps> = ({
  fruits,
  groupBy,
  onAddToJar,
}) => {
  const [sortDirection, setSortDirection] =
    useState<TableSortLabelOwnProps["direction"]>();
  const groupedFruits: GroupedFruits = groupFruits(fruits);
  // console.log(groupedFruits, groupBy);
  console.log(groupBy !== "none" && Object.keys(groupedFruits[groupBy]));

  // return undefined;
  return (
    <TableContainer sx={{ maxHeight: "100%" }}>
      <Table aria-label="fruit table" size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Family</TableCell>
            <TableCell>Order</TableCell>
            <TableCell>Genus</TableCell>
            <TableCell align="right" sortDirection={sortDirection}>
              <TableSortLabel
                active={true}
                direction={sortDirection}
                onClick={() => {
                  setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
                }}
              >
                Calories
                <Box component="span" sx={visuallyHidden}>
                  {sortDirection === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...fruits].sort(getComparator(sortDirection)).map((fruit) => (
            <TableRow
              key={fruit.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {fruit.id}
              </TableCell>
              <TableCell>{fruit.name}</TableCell>
              <TableCell>{fruit.family}</TableCell>
              <TableCell>{fruit.order}</TableCell>
              <TableCell>{fruit.genus}</TableCell>
              <TableCell align="right">{fruit.nutritions.calories}</TableCell>
              <TableCell align="center">
                <Button onClick={() => onAddToJar(fruit)} variant="contained">
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FruitGrid;
