import React from 'react'
import App from './App.jsx'
import { Provider } from "react-redux";
import Store from "./redux/store.jsx";
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);



