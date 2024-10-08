import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { Fruit } from "@/app/lib/definitions";
import { PieValueType } from "@mui/x-charts";
import CircleIcon from "@mui/icons-material/Circle";

interface JarProps {
  jarFruits: Fruit[];
}

const Jar: React.FC<JarProps> = ({ jarFruits }) => {
  const totalCalories = jarFruits.reduce(
    (total, fruit) => total + fruit.nutritions.calories,
    0,
  );

  const pieData: PieValueType[] = jarFruits.reduce((acc, fruit) => {
    const existing = acc.find((item) => item.id === fruit.id);
    if (existing) {
      existing.value += fruit.nutritions.calories;
    } else {
      acc.push({
        id: fruit.id,
        label: fruit.name,
        value: fruit.nutritions.calories,
      });
    }
    return acc;
  }, [] as PieValueType[]);

  return (
    <>
      <Box height={40} marginTop={2} display={"flex"} alignItems={"center"}>
        <Typography variant="h5">Jar</Typography>
      </Box>
      <Box
        display={"flex"}
        flexGrow={1}
        minHeight={0}
        padding={2}
        sx={{ overflowY: "auto", border: `1px solid rgba(0, 0, 0, .125)` }}
        gap={2}
      >
        <Box flexGrow={1} flexBasis={"50%"}>
          <Typography variant="h6">Total Calories: {totalCalories}</Typography>
          {jarFruits.length ? (
            <List disablePadding>
              {jarFruits.map((fruit, index) => (
                <ListItem
                  key={fruit.id}
                  disableGutters
                  disablePadding
                  sx={{
                    paddingX: 2,
                    paddingY: 1,
                    border: `1px solid rgba(0, 0, 0, .125)`,
                    borderTop: "none",
                    "&:first-child": {
                      border: `1px solid rgba(0, 0, 0, .125)`,
                    },
                  }}
                  divider={index !== jarFruits.length - 1}
                >
                  <ListItemIcon>
                    <CircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${fruit.name} (${fruit.nutritions.calories} cal)`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">Add fruits to jar</Typography>
          )}
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexGrow={1}
          flexBasis={"50%"}
        >
          <PieChart
            series={[
              {
                data: pieData,
              },
            ]}
            // width={600}
            height={400}
          />
        </Box>
      </Box>
    </>
  );
};

export default Jar;
