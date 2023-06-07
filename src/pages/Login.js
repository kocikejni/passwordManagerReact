import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div class="container">
      <h2>Login</h2>
      <form action="#" method="post" >
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
        />
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <input type="submit" value="Login" />
      </form>
      <p class="error-message">Incorrect username or password.</p>
    </div>
  );
};

export default Login;
