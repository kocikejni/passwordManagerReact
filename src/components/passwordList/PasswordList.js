import axios from "axios";
import { useEffect, useState } from "react";
import SinglePassword from "./SinglePassword";
import { useNavigate } from "react-router-dom";
import PopUpDialog from "../dialog/PopUpDialog";
import { Grid } from "@mui/material";

const PasswordList = () => {
  const navigate = useNavigate();
  const [passwordList, setPasswordList] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:3001/getpasswords", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        setPasswordList(response.data);
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.data === "Invalid token") {
          navigate("/login");
        }
      });
  }, [token, navigate]); // Empty dependency array ensures the effect runs only once


  const getPasswordDetails = (id) => {
    axios
      .get(`http://localhost:3001/getpassword/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSelectedPassword(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "Invalid token") {
          navigate("/login");
        }
      });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop={5}
        rowGap={3}
      >
        {passwordList &&
          passwordList.map((val, key) => {
            return (
              <SinglePassword
                key={key}
                getPasswordDetails={() => getPasswordDetails(val.id)}
                title={val.title}
                email={val.email}
              />
            );
          })}
      </Grid>
      <PopUpDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        selectedPassword={selectedPassword}
      />
    </>
  );
};

export default PasswordList;

// const decryptPassword = (encryption) => {
//   axios
//     .post("http://localhost:3001/decryptpassword", {
//       password: encryption.password,
//       iv: encryption.iv,
//     })
//     .then((response) => {
//       setPasswordList(
//         passwordList.map((val) => {
//           return val.id === encryption.id
//             ? {
//                 id: val.id,
//                 password: val.password,
//                 title: response.data,
//                 iv: val.iv,
//                 email: val.email
//               }
//             : val;
//         })
//       );
//     })
//     .catch((error) => {
//       console.log(error);
//       if (error.response.data === "Invalid token") {
//         navigate("/login");
//       }
//     });
// };
