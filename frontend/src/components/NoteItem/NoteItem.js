import React, { useEffect, useState } from "react";
import { IconButton, TextField } from "@material-ui/core";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@material-ui/icons";
import { get } from "lodash";

import useStyles from "./NoteItem.styles.js";

const NoteItem = ({ item, editNote, deleteNote, opened }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(get(item, "title", ""));
  const [content, setContent] = useState(get(item, "content", ""));

  useEffect(() => {
    if (editing) {
      // request ao backend
    }
  }, [editing]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {editing ? (
        <div className={classes.editingNote}>
          <div className={classes.topEditingButtons}>
            <IconButton
              edge="start"
              className={classes.editButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setEditing(false);
              }}
            >
              <CancelIcon />
            </IconButton>
          </div>
          <div className={classes.editingTextFields}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              fullWidth
              placeholder="Default Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="title"
              label="Content"
              placeholder="Default Content"
              fullWidth
              multiline
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
          </div>
          <div className={classes.editingModeButtons}>
            <IconButton
              edge="start"
              className={classes.editButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setEditing(false);
                editNote({ title, content, key: item.key });
              }}
            >
              <SaveIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <>
          <div className={classes.content}>
            <span className={classes.contentItems}>
              Title: {item.title.substring(0, 50)}
            </span>
            <br />
            <span>Content: {item.content.substring(0, 50)}</span>
          </div>
          <div>
            <IconButton
              edge="start"
              className={classes.editButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setEditing(true);
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
        </>
      )}
    </div>
  );
};

export default NoteItem;
