import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "./App.css";
import ContainerList from "./components/ContainerList";

function App() {
  const [token, setToken] = useState("");
  const [nodes, setNodes] = useState("");
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(0);

  /*   useEffect(() => {
    fetch("http://20.76.179.252/api/v1/node")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setNodes(response);
      });
  }, [nodes]); */

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
        console.log(nodes);
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
        console.log(response);
      });
  };

  return (
    <>
      <Grid container spacing={2} minHeight={160} disableEqualOverflow>
        <Grid
          xs={12}
          md={8}
          display="block"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            {token.length === 0 && (
              <Button variant="contained" onClick={Login}>
                LOGIN
              </Button>
            )}
            <Button variant="contained" onClick={NodeList}>
              SHOW FULL LIST
            </Button>
          </Box>
          <Box>
            {nodes.length !== 0 ? (
              Object.values(nodes).map((node, index) => {
                return (
                  <>
                    <Box>
                      <Accordion key={index}>
                        <AccordionSummary expandIcon={"🔼"}>
                          <Typography variant="h5">
                            {node.id} - {node.name}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {node.parentId !== node.id ? (
                            <Typography>No hay subnodos</Typography>
                          ) : (
                            <Typography>{node.parentId}</Typography>
                          )}
                          <Button variant="contained" onClick={AddElement}>
                            Añadir nodo
                          </Button>
                          <br />
                          <br />
                          <input
                            type="text"
                            value={name}
                            placeholder="Nombre"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <input
                            type="text"
                            value={parentId}
                            placeholder="ParentId"
                            onChange={(e) => setParentId(e.target.value)}
                          />
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </>
                );
              })
            ) : (
              <>
                <br />
                <br />
                <Button variant="contained" onClick={AddElement}>
                  Añadir nodo
                </Button>
                <br />
                <br />
                <input
                  type="text"
                  value={name}
                  placeholder="Nombre"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  value={parentId}
                  placeholder="ParentId"
                  onChange={(e) => setParentId(e.target.value)}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
