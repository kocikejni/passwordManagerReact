import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        email: username,
        password: password,
      })
      .then((response) => {
        if (response.data.success === true) {
          const token = response.data.token;
          // Save the token to localStorage
          localStorage.setItem('token', token);
          navigate("/");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="container">
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
    </div>
  );
};

export default Login;
