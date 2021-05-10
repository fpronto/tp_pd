import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

const initialState = {
  isLoading: false,
  data: [],
};

export const data = (
  state = initialState.data,
  action = constants.DEFAULT_ACTION
) => {
  switch (action.type) {
    case actionTypes.FETCH_NOTES_START:
      return [];
    case actionTypes.FETCH_NOTES_SUCCESS:
      return action.payload;
    case actionTypes.FETCH_NOTES_FAIL:
    case actionTypes.RESET:
      return initialState.data;
    default:
      return state;
  }
};

export const getData = (state) => get(state, "data", initialState.data);

const reducer = combineReducers({
  data,
});

export default reducer;
