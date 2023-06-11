import React from 'react'

const Register = () => {
  return (
    <div class="container">
      <h2>Register</h2>
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
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}

export default Register