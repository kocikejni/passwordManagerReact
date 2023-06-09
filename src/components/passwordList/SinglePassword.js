import { Grid, IconButton, Typography } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import colors from "../Colors";

const SinglePassword = ({
  decryptPassword,
  title,
  getPasswordDetails,
  email,
  deletePassword
}) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      padding={1}
      sx={{background:colors.myrtleGreen, maxWidth:'550px', borderRadius:'10px'}}
    >
      <Grid
        container
        item
        md={10}
        xs={10}
        direction="column"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Typography sx={{ color: colors.night, fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography sx={{ color: colors.white }}>{email}</Typography>
      </Grid>
      <Grid container item md={1} xs={1}>
        <IconButton
          disableRipple
          onClick={getPasswordDetails}
          sx={{ width: 0 }}
        >
          <FullscreenIcon fontSize="medium" sx={{color: colors.white}} />
        </IconButton>
      </Grid>
      <Grid container item md={1} xs={1}>
        <IconButton
          disableRipple
          onClick={deletePassword}
          sx={{ width: 0 }}
        >
          <DeleteIcon fontSize="medium" sx={{color: colors.white}} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SinglePassword;