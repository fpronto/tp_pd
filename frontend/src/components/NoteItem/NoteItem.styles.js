import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "lightGrey",
    padding: "1.5rem",
    border: "solid black 1px",
    borderRadius: "1rem",
    margin: "0.8rem 0rem",
    width: "70%",
    justifyContent: "space-between",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contentItems: {
    margin: "0rem 1rem 0rem 0rem",
  },
  editingNote: {
    position: "relative",
    width: "100%",
  },
  editingTextFields: {},
  editButton: {},
  editingModeButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    bottom: 0,
    right: 0,
  },
  topEditingButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    top: 0,
    right: 0,
  },
}));

export default useStyles;
