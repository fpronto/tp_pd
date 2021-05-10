import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./state";

import Header from "./components/Header";
import NoteList from "./components/NoteList";

import "./App.css";

const App = () => {
  const rMiddleware = routerMiddleware(history);
  const createStoreWithMiddleware = compose(
    applyMiddleware(rMiddleware, thunk)
  )(createStore);

  const store = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <NoteList notes={[1, 2, 3, 4]} />
      </div>
    </Provider>
  );
};

export default App;
