// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
   <div className='dark:bg-[#101828]'>
   <App />
   </div>
  </Provider>,
  document.getElementById('root')
);
