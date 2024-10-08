import { AppBar, Box, Typography } from "@mui/material";
import MainSection from "./MainSection";

function App() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <AppBar position="static">
          <Typography variant="h5" padding={2}>
            Fruit Jar App
          </Typography>
        </AppBar>
        <MainSection />
        <Box component="footer" padding={2}>
          <Typography align="center" color="textSecondary">
            Developed by Rahul
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default App;
