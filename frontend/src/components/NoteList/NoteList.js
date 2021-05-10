import React from "react";
import PropTypes from "prop-types";
import NoteItem from "../NoteItem";

const propTypes = {
  notes: PropTypes.array,
};

const defaultProps = {
  notes: [],
};

const NoteList = (props) => {
  const { notes } = props;
  return notes.map((note) => <NoteItem item={note} />);
};
NoteList.propTypes = propTypes;
NoteList.defaultProps = defaultProps;
export default NoteList;
