import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import Note from "./components/Note";
import sdk from "./sdk/sdk";

import "./App.css";
const initialValuesForNotes = [
  { title: "1", content: "1" },
  { title: "2", content: "2" },
  { title: "3", content: "3" },
  { title: "4", content: "4" },
  { title: "5", content: "5" },
];
const App = () => {
  const [notes, setNotes] = useState(initialValuesForNotes);
  const [open, setOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState();

  const fetchData = async () => {
    try {
      const results = await sdk.methods.getNotes();
      const jsons = await results.json();
      return {
        statusCode: 200,
        notes: jsons.map((json) => ({ title: json.title, content: json.body })),
      };
    } catch (err) {
      return { statusCode: 400, error: err.message };
    }
  };

  const postData = async () => {
    try {
      const results = await sdk.methods.postNote();
      const jsons = await results.json();
      return { statusCode: 200 };
    } catch (err) {
      return { statusCode: 400, error: err.message };
    }
  };
  const putData = async () => {
    try {
      return { statusCode: 200 };
    } catch (err) {
      return { statusCode: 400, error: err.message };
    }
  };

  const deleteData = async () => {
    try {
      return { statusCode: 200 };
    } catch (err) {
      return { statusCode: 400, error: err.message };
    }
  };

  useEffect(() => {
    const callFunctionFetchData = async () => {
      const value = await fetchData();
      if (value.statusCode === 200) {
        setNotes(value.notes);
      }
    };
    callFunctionFetchData();
  }, []);

  const handleClickOpen = (note) => {
    setNoteToEdit(note);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNoteToEdit();
  };

  const handleSave = (savingNote) => {
    const noteExists = notes.findIndex((note, i) => savingNote.key === i);
    if (noteExists >= 0) {
      setNotes(
        notes.map((note, i) => {
          if (i === savingNote.key) {
            return { title: savingNote.title, content: savingNote.content };
          }
          return note;
        })
      );
    } else {
      setNotes([
        ...notes,
        { title: savingNote.title, content: savingNote.content },
      ]);
    }
  };

  const handleNoteSave = (savingNote) => {
    handleClose();
    handleSave(savingNote);
  };

  const addNote = (values = { title: "", content: "" }) => {
    handleClickOpen({ ...values, key: notes.length });
  };

  const editNote = (savingNote) => {
    handleSave(savingNote);
  };

  const deleteNote = (key) => {
    setNotes(notes.filter((note, i) => i !== key));
  };

  return (
    <div className="App">
      <Header addNote={addNote} />
      <NoteList notes={notes} editNote={editNote} deleteNote={deleteNote} />
      <Note
        noteToEdit={noteToEdit}
        open={open}
        handleClose={handleClose}
        handleSave={handleNoteSave}
      />
    </div>
  );
};

export default App;
