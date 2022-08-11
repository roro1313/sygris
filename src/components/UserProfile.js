import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";
import {
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardActionArea,
  CardActions,
} from "@mui/material";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="spinner">
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    isAuthenticated && (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={user.picture}
            alt={user.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              {user.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <LogoutButton />
        </CardActions>
      </Card>
    )
  );
};

export default UserProfile;
