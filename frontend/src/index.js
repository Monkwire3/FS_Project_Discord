import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './store';
import { BrowserRouter } from 'react-router-dom';
import csrfFetch, { restoreCSRF } from './store/csrfFetch';
import * as sessionActions from './store/session';
import * as usersActions from './store/users';
import serversReducer, * as serversActions from './store/servers';
import channelsReducer, * as channelActions from './store/channels'
import { ModalProvider } from './context/Modal';
import actioncable from 'actioncable';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.usersActions = usersActions;
  window.serversActions = serversActions;
  window.channelActions = channelActions;
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const CableApp = {}
CableApp.cable = ActionCable.createConsumer('ws://localhost:3000/cable')

function Root() {
  return (
    <ModalProvider>
    <Provider store={store}>
      <BrowserRouter>
      <App cable={CableApp.cable}/>
      </BrowserRouter>
    </Provider>
    </ModalProvider>
  )
}

if (sessionStorage.getItem('user') === null || sessionStorage.getItem('X-CSRF-Token') === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication)
} else {
  renderApplication();
}
