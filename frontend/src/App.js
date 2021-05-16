import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import Note from "./components/Note";
import sdk from "./sdk/sdk";

import "./App.css";
const initialValuesForNotes = [];

const App = () => {
  const [notes, setNotes] = useState(initialValuesForNotes);
  const [open, setOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState();

  const fetchData = async () => {
    try {
      const results = await sdk.methods.getNotes();
      if (results.status > 300) {
        throw new Error("Status not expected");
      }
      const jsons = await results.json();
      return {
        statusCode: 200,
        notes: jsons.map((json) => ({
          key: json._id,
          title: json.title,
          content: json.content,
        })),
      };
    } catch (err) {
      return { statusCode: 400, error: err.message };
    }
  };

  const postData = async (savingNote) => {
    try {
      const results = await sdk.methods.postNote(savingNote);
      if (results.status > 300) {
        throw new Error("Status not expected");
      }
      const jsons = await results.json();
      return { statusCode: 200 };
    } catch (err) {
      return { statusCode: 400, error: err.message };
    }
  };

  const putData = async (savingNote) => {
    try {
      const results = await sdk.methods.putNote(savingNote.key, savingNote);
      if (results.status > 300) {
        throw new Error("Status not expected");
      }
      const jsons = await results.json();
      return { statusCode: 200 };
    } catch (err) {
      return { statusCode: 400, error: err.message };
    }
  };

  const deleteData = async (id) => {
    try {
      const results = await sdk.methods.deleteNote(id);
      if (results.status > 300) {
        throw new Error("Status not expected");
      }
      const jsons = await results.json();
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
    const noteExists = notes.findIndex((note) => savingNote.key === note.key);
    if (noteExists >= 0) {
      setNotes(
        notes.map((note) => {
          if (note.key === savingNote.key) {
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

  const handleNoteSave = async (savingNote) => {
    handleClose();
    const result = await postData(savingNote);
    if (result.statusCode === 200) {
      handleSave(savingNote, "POST");
    }
  };

  const addNote = (values = { title: "", content: "" }) => {
    handleClickOpen({ ...values, key: notes.length });
  };

  const editNote = async (savingNote) => {
    const result = await putData(savingNote);
    if (result.statusCode === 200) {
      handleSave(savingNote);
    }
  };

  const deleteNote = async (key) => {
    const result = await deleteData(key);
    if (result.statusCode === 200) {
      setNotes(notes.filter((note) => note.key !== key));
    }
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
