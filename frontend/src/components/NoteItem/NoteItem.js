import React from "react";
import { IconButton } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

import useStyles from "./NoteItem.styles.js";

const NoteItem = ({ item, editNote, deleteNote }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <span className={classes.contentItems}>
          Title: {item.title.substring(0, 50)}
        </span>
        <br />
        <span>Content: {item.value.substring(0, 50)}</span>
      </div>
      <div>
        <IconButton
          edge="start"
          className={classes.editButton}
          color="inherit"
          aria-label="menu"
          onClick={() => {
            editNote(item.key);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="start"
          className={classes.editButton}
          color="inherit"
          aria-label="menu"
          onClick={() => {
            deleteNote(item.key);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default NoteItem;
