import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './context/AuthContext'; //로그인 유저 정보
import {store, persistor} from './store/store';

import { Provider } from 'react-redux';


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <AuthProvider>
        {/* <PersistGate persistor={persistor}> */}
          <App />
        {/* </PersistGate> */}
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);