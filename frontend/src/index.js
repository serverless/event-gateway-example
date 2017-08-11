import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/normalize.css';
import './assets/index.css';
import App from './App';
import configureStore from './store/configureStore';

const initialState = {
  session: sessionStorage.getItem('session')
};
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
