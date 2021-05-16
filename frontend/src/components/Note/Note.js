import React, { useEffect, useState } from "react";
import { get } from "lodash";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

const Note = ({ open, handleClose, handleSave, noteToEdit }) => {
  const [title, setTitle] = useState(get(noteToEdit, "title", ""));
  const [content, setContent] = useState(get(noteToEdit, "content", ""));
  useEffect(() => {
    if (open === true) {
      setTitle(get(noteToEdit, "title", ""));
      setContent(get(noteToEdit, "content", ""));
    } else {
      setTitle("");
      setContent("");
    }
  }, [open, noteToEdit]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={title === "" || content === ""}
            onClick={() => {
              handleSave({ ...noteToEdit, title, content });
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Note;
