import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import './index.css'
import configureStore from './store'
import { BrowserRouter } from 'react-router-dom'
import csrfFetch, { restoreCSRF } from './store/csrfFetch';
import * as sessionActions from './store/session'
import * as usersActions from './store/users';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.usersActions = usersActions;
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}


function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  )
}

if (sessionStorage.getItem('X-CSRF-Token') === null)  {
  restoreCSRF().then(renderApplication);
} else {
  renderApplication();
}
