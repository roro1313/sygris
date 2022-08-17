import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
  CardContent,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import "./App.css";
import * as Styles from "./Styles";
import InteractionMenu from "./components/InteractionMenu/InteractionMenu";

function App() {
  const [token, setToken] = useState("");
  const [nodes, setNodes] = useState("");
  const [totalNodes, setTotalNodes] = useState(0);
  const [addingMode, setAddingMode] = useState(false);
  const [deletingMode, setDeletingMode] = useState(false);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(0);
  const [id, setId] = useState(0);

  const Login = () => {
    fetch("http://20.76.179.252/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "rociorgz@outlook.com",
        password:
          "$2b$10$D5P/w3tk6Jh.GqtkC/K22O/ycs8vMWW9HiG0NcUbAICDGyZSpEIlW",
      }),
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setToken(response.access_token);
        console.log(token);
      });
  };

  const NodeList = () => {
    fetch("http://20.76.179.252/api/v1/node", {
      method: "GET",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setNodes(response);
		setTotalNodes(response.length);
      });
  };

  const AddElement = () => {
    fetch("http://20.76.179.252/api/v1/node", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        parentId: parseInt(parentId),
      }),
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        NodeList();
        setName("");
      });
  };

  const DeleteElement = () => {
    fetch("http://20.76.179.252/api/v1/node/" + parseInt(id), {
      method: "DELETE",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
		NodeList();
        setId(0);
      });
  };

  return (
    <>
      <InteractionMenu
        setAddingMode={setAddingMode}
        setDeletingMode={setDeletingMode}
      />
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={12}
          textAlign={"center"}
          justifyContent={"center"}
        >
          <Box>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Prueba técnica Sygris front end
              </Typography>
              <Typography variant="h5" component="div">
                ¡Hola!
              </Typography>
              <Typography variant="body2">
                Pulsa el botón para iniciar sesión y poder visualizar el
                contenido
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          textAlign={"center"}
          justifyContent={"center"}
        >
          {token.length === 0 ? (
            <>
              <Button size="large" variant="outlined" onClick={Login}>
                Iniciar sesión
              </Button>
              <Button size="large" variant="outlined" disabled>
                Ver lista de nodos
              </Button>
            </>
          ) : (
            <>
              <Button size="large" variant="outlined" disabled>
                Iniciar sesión
              </Button>
              <Button size="large" variant="outlined" onClick={NodeList}>
                Ver lista de nodos
              </Button>
			  <Typography>Total nodos cargados: {totalNodes}</Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Box textAlign={"center"} justifyContent={"center"}>
        {addingMode && (
          <>
            <br />
            <br />
            <TextField
              id="name"
              label="Node"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-parentId"
              label="Parent Id"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            />
            <br />
            <br />
            <Styles.CustomButton variant="contained" onClick={AddElement}>
              Añadir nodo
            </Styles.CustomButton>
          </>
        )}
        <br />
        <br />
        {deletingMode && (
          <>
            <br />
            <br />
            <TextField
              id="outlined-id"
              label="Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <br />
            <br />
            <Styles.CustomButton variant="contained" onClick={DeleteElement}>
              Eliminar nodo
            </Styles.CustomButton>
			<br />
            <br />
          </>
        )}
      </Box>
      {nodes.length !== 0 &&
        Object.values(nodes).map((node, index) => {
          return (
            <>
              <Accordion key={index}>
                <AccordionSummary expandIcon={"🔼"}>
                  <Typography variant="h5">
                    {node.id} - {node.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Parent ID: {node.parentId}</Typography>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
    </>
  );
}

export default App;
