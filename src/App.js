import React from "react";
import LoginButton from "./components/Login";
import UserProfile from "./components/UserProfile";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
      <Grid container spacing={2} minHeight={160} disableEqualOverflow>
      <Grid xs={12} md={12} display="flex" justifyContent="center" alignItems="center">
        {!isAuthenticated ? (
          <Box>
            <LoginButton />
          </Box>
        ) : (
          <Box>
            <UserProfile />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
