import CircleIcon from "@mui/icons-material/Circle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Fruit, GroupByKey, GroupedFruits } from "../../lib/definitions";
import { groupByList } from "../../lib/constants";

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

interface FruitListProps {
  fruits: Fruit[];
  groupBy: GroupByKey | "none";
  onAddToJar: (fruit: Fruit) => void;
  onAddGroupToJar: (groupFruits: Fruit[]) => void;
}

const FruitList: React.FC<FruitListProps> = ({
  fruits,
  groupBy,
  onAddToJar,
  onAddGroupToJar,
}) => {
  const groupedFruits: GroupedFruits = groupFruits(fruits);
  console.log(groupBy !== "none" && Object.keys(groupedFruits[groupBy]));

  return (
    <>
      {groupBy === "none" ? (
        <List disablePadding>
          {fruits.map((fruit, index) => (
            <ListItem
              key={fruit.id}
              disableGutters
              disablePadding
              sx={{
                paddingX: 2,
                paddingY: 1,
              }}
              divider={index !== fruits.length - 1}
            >
              <ListItemIcon>
                <CircleIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${fruit.name} (${fruit.nutritions.calories} cal)`}
              />
              <Button onClick={() => onAddToJar(fruit)} variant="contained">
                Add
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        Object.keys(groupedFruits[groupBy]).map((group) => (
          <Accordion
            key={group}
            disableGutters
            elevation={0}
            square
            sx={{
              "&:not(:last-child)": {
                borderBottom: 0,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                paddingX: 2,
                paddingY: 1,
                minHeight: "unset",
                flexDirection: "row-reverse",
                gap: 1,

                "& .MuiAccordionSummary-content": {
                  margin: 0,
                  alignItems: "center",
                  gap: 2,
                },
              }}
            >
              <Typography flex={1}>{group}</Typography>
              <Button
                onClick={() =>
                  onAddGroupToJar(groupedFruits[groupBy][group as GroupByKey])
                }
                variant="contained"
              >
                Add All
              </Button>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: 0,
                borderTop: "1px solid rgba(0, 0, 0, .125)",
              }}
            >
              <List disablePadding>
                {Object.values(groupedFruits[groupBy][group as GroupByKey]).map(
                  (fruit, index) => (
                    <ListItem
                      key={fruit.id}
                      disableGutters
                      disablePadding
                      divider={
                        index !==
                        Object.values(
                          groupedFruits[groupBy][group as GroupByKey]
                        ).length -
                          1
                      }
                      sx={{
                        paddingX: 2,
                        paddingY: 1,
                      }}
                    >
                      <ListItemIcon>
                        <CircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${fruit.name} (${fruit.nutritions.calories} cal)`}
                      />
                      <Button
                        onClick={() => onAddToJar(fruit)}
                        variant="outlined"
                      >
                        Add
                      </Button>
                    </ListItem>
                  )
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </>
  );
};

export default FruitList;
