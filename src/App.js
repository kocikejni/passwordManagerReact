import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPassword from "./components/addPassword/AddPassword";
import PasswordList from "./components/passwordList/PasswordList";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PasswordList/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/addpassword" element={<AddPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
