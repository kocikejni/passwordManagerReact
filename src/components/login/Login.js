import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Alert,
  Snackbar,
} from "@mui/material";
import colors from "../Colors";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false)

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        email: username,
        password: password,
      })
      .then((response) => {
        if (response.data.success === true) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          navigate("/");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setOpen(true)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
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
        Login
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
          onClick={handleSubmit}
          sx={{
            width: "30%",
            background: colors.darkGreen,
            color: colors.white,
            textTransform: "none",
          }}
        >
          Login
        </Button>
        <Link
          underline="hover"
          sx={{
            color: colors.myrtleGreen,
            textDecorationColor: colors.cambridgeBlue,
            ":hover": { textDecorationColor: colors.cambridgeBlue },
          }}
          onClick={() => {
            navigate("/register");
          }}
          component="button"
          variant="body1"
        >
          Rregjistrohu
        </Link>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
      >
        <Alert severity={'error'} sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Login;

{
  /* <div className="container">
      <h2>Login</h2>
      <form action="#" method="post">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" onClick={handleSubmit} />
      </form>
      {errorMessage !== "" && <p class="error-message">{errorMessage}</p>}
    </div> */
}
