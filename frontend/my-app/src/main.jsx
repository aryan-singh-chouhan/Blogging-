import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
          <App />
        </PersistGate>
        <ToastContainer position="top-right" autoClose={3000} />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
