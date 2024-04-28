import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRoutes from './AppRoutes';
import './App.css';
import { AlertProvider } from './context/AlertProvider';
import { LoadingProvider } from './context/LoadingProvider';

const App = () => {
  axios.defaults.withCredentials = true;

  return (
    <Provider store={store}>
      <AlertProvider>
        <LoadingProvider>
          <AppRoutes />
        </LoadingProvider>
      </AlertProvider>
    </Provider>
  );
};

export default App;
