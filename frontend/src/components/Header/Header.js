import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import useStyles from "./Header.styles";

const Header = ({ addNote }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h3" className={classes.title}>
          Taking Notes WebApp
        </Typography>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => addNote()}
        >
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
