import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPassword from "./components/addPassword/AddPassword";
import PasswordList from "./components/passwordList/PasswordList";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ResponsiveAppBar from "./components/appBar/ResponsiveAppBar";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Router>
      <ResponsiveAppBar />
      <Grid container maxWidth={"1080px"}>
        
          <Routes>
            <Route exact path="" element={<PasswordList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addpassword" element={<AddPassword />} />
          </Routes>
        
      </Grid>
      </Router>
    </Grid>
  );
}

export default App;
