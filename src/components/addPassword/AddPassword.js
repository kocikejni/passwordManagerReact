import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import colors from "../Colors";

const AddPassword = () => {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const addPassword = () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    console.log(token); // Check if the token is retrieved correctly

    axios
      .post(
        "http://localhost:3001/addpassword",
        {
          password: password,
          title: title,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      )
      .then((response) => {
        if (response.data.success === true) {
          navigate("/passwordList");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "Invalid token") {
          navigate("/login");
        }
      });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop={5}
    >
      <Grid container maxWidth={"500px"} rowGap={3}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth={true}
          color="success"
          label={"Email"}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth={true}
          color="success"
          label={"Password"}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth={true}
          color="success"
          label={"Title"}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <Button
          fullWidth={true}
          sx={{
            background: colors.darkGreen,
            color: colors.white,
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { background: colors.darkGreen },
          }}
          onClick={addPassword}
        >
          Add Password
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddPassword;
