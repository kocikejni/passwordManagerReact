import axios from "axios";
import React, { useEffect, useState } from "react";

const PasswordList = () => {
  const [passwordList, setPasswordList] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios.get("http://localhost:3001/getpasswords",{
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    }).then((response) => {
        setPasswordList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    console.log(passwordList); // Log the updated passwordList state
  }, [passwordList]); // Dependency array includes passwordList


  const decryptPassword = (encryption) => {
    axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList(
        passwordList.map((val) => {
          return val.id === encryption.id
            ? {
                id: val.id,
                password: val.password,
                title: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };
  return (
    <div className="Passwords">
      {passwordList.map((val, key) => {
        return (
          <div
            key={key}
            className="password"
            onClick={() => {
              decryptPassword({
                password: val.password,
                iv: val.iv,
                id: val.id,
              });
            }}
          >
            <h3>{val.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordList;
