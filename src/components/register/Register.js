import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import colors from "../Colors";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const registerResponse = await axios.post(
        "http://localhost:3001/register",
        { email: username, password: password }
      );

      if (registerResponse.data === "Success") {
        const loginResponse = await axios
          .post("http://localhost:3001/login", {
            email: username,
            password: password,
          })
          .then((response) => {
            if (response.data.success === true) {
              navigate("/");
            }
          });

        const token = loginResponse.data.token;

        localStorage.setItem("token", token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      fullWidth={true}
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      fullHeight={true}
      marginTop={3}
    >
      <Typography variant="h4" marginBottom={4}>
        Register
      </Typography>
      <Grid
        container
        fullWidth={true}
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        rowGap={3}
      >
        <TextField
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          size="small"
          onChange={(e) => setUserName(e.target.value)}
          required
          color="success"
          sx={{ width: "30%" }}
        />
        <TextField
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ width: "30%" }}
          color="success"
        />
        <Button
          marginTop={2}
          onClick={handleRegistration}
          sx={{
            width: "30%",
            background: colors.darkGreen,
            color: colors.white,
            textTransform: "none",
          }}
        >
          Rregjistrohu
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
