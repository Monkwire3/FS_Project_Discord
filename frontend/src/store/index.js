import { useReducer } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import channelsReducer from './channels';
import serversReducer from './servers';
import sessionReducer from './session';
import usersReducer from './users';
import chatsReducer from './chat';


const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  servers: serversReducer,
  channels: channelsReducer,
  chats: chatsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
