import { createStore, applyMiddleware, compose } from 'redux';
import { batchDispatch } from './action-creators';
import { createEpicMiddleware } from "redux-observable";
import rootReducer from './reducer';
import rootEpic from "./epic";

const epicMiddleware = createEpicMiddleware();

export const configureStore = () => {

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware)
    )
  );

  epicMiddleware.run(rootEpic);
  window.store = store;
  window.batchDispatch = batchDispatch;
  return store;
}