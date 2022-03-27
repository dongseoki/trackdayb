import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './store/store';

import { Provider } from 'react-redux';
import dotenv from "dotenv";
dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      {/* <PersistGate persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);