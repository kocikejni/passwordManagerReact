import axios from 'axios';
import React, { useState } from 'react'
import './../../App.css'

const AddPassword = () => {
    const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  

 

  const addPassword = () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    console.log(token); // Check if the token is retrieved correctly
  
    axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  

  
  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Ex. password123"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Ex. Facebook"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>
      
    </div>
  )
}

export default AddPassword