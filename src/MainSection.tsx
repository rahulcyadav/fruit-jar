"use client";
import GridIcon from "@mui/icons-material/GridOn";
import ListIcon from "@mui/icons-material/List";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import FruitDataDisplay from "./FruitDataDisplay";
import { Fruit, GroupByKey } from "./lib/definitions";
import Jar from "./ui/Jar/Jar";
import { groupByList } from "./lib/constants";

export default function MainSection() {
  const [groupBy, setGroupBy] = useState<GroupByKey | "none">("none");
  const [view, setView] = useState<"grid" | "list">("list");
  const [jarFruits, setJarFruits] = useState<Fruit[]>([]);

  const onChangeGroupBy = (event: SelectChangeEvent<string>) => {
    setGroupBy(event.target.value as GroupByKey | "none");
  };

  const addToJar = (fruit: Fruit) => {
    setJarFruits([...jarFruits, fruit]);
  };

  const addGroupToJar = (groupFruits: Fruit[]) => {
    setJarFruits([...jarFruits, ...groupFruits]);
  };

  return (
    <Grid2
      flexGrow={1}
      component={"main"}
      minHeight={0}
      container
      spacing={2}
      paddingX={2}
    >
      <Grid2
        size={{ xs: 6 }}
        display="flex"
        flexDirection="column"
        height="100%"
        gap={1}
      >
        <Box marginTop={2} display={"flex"} gap={1}>
          <FormControl fullWidth>
            <InputLabel id="group-by-select-label">Group By</InputLabel>
            <Select
              labelId="group-by-select-label"
              id="group-by-select"
              value={groupBy}
              onChange={onChangeGroupBy}
              size="small"
              variant="outlined"
              label="Group By"
            >
              <MenuItem value="none">none</MenuItem>
              {groupByList.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ButtonGroup aria-label="view select buttons">
            <Button
              variant={view === "list" ? "contained" : "outlined"}
              aria-label="list view"
              onClick={() => {
                setView("list");
              }}
            >
              <ListIcon />
            </Button>
            <Button
              variant={view === "grid" ? "contained" : "outlined"}
              aria-label="grid view"
              onClick={() => {
                setView("grid");
              }}
            >
              <GridIcon />
            </Button>
          </ButtonGroup>
        </Box>

        <ErrorBoundary
          fallbackRender={({ error }) => (
            <Box
              flexGrow={1}
              minHeight={0}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography color="error">{error.message}</Typography>
            </Box>
          )}
        >
          <Suspense
            fallback={
              <Box
                flexGrow={1}
                minHeight={0}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Box
              flexGrow={1}
              minHeight={0}
              sx={{
                overflowY: "auto",
                border: `1px solid rgba(0, 0, 0, .125)`,
              }}
            >
              <FruitDataDisplay
                groupBy={groupBy}
                view={view}
                onAddToJar={addToJar}
                onAddGroupToJar={addGroupToJar}
              />
            </Box>
          </Suspense>
        </ErrorBoundary>
      </Grid2>

      <Grid2
        size={{ xs: 6 }}
        display="flex"
        flexDirection="column"
        height="100%"
        gap={1}
      >
        <Jar jarFruits={jarFruits} />
      </Grid2>
    </Grid2>
  );
}
