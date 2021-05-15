import React from "react";
import PropTypes from "prop-types";
import NoteItem from "../NoteItem";
import useStyles from "./NoteList.styles";

const propTypes = {
  notes: PropTypes.array,
};

const defaultProps = {
  notes: [],
};

const NoteList = (props) => {
  const { notes, editNote, deleteNote } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {notes.map((note, i) => (
        <NoteItem
          key={i}
          editNote={editNote}
          deleteNote={deleteNote}
          item={{ ...note, key: i }}
        />
      ))}
    </div>
  );
};
NoteList.propTypes = propTypes;
NoteList.defaultProps = defaultProps;
export default NoteList;
