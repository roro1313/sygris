import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="outlined" onClick={() => loginWithRedirect()}>Iniciar sesión</Button>;
};

export default LoginButton;

