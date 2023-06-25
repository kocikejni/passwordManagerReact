import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PopUpDialog = ({ open, handleClose, selectedPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (selectedPassword) {
      setEmail(selectedPassword.email);
      setPassword(selectedPassword.password);
      setTitle(selectedPassword.title);
    }
  }, [selectedPassword]);

  const editPassword = () => {
    axios
      .put(
        "http://localhost:3001/updatepassword",
        {
          password: password,
          title: title,
          email: email,
          id: selectedPassword.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success === true) {
          navigate("/");
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
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Saved Password</DialogTitle>
        <Grid
          container
          item
          md={12}
          xs={12}
          padding={2}
          direction="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            color="success"
          />
          <FormControl sx={{ width: "100%" }} color="success" variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="Email"
            fullWidth
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="success"
          />
        </Grid>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editPassword}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUpDialog;
