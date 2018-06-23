import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
  );
} else {
  store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(logger, thunk))
  );
}

export default store;
