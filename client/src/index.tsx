import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Actions from './reducers/actions/user';


import './index.scss';


import store from './store/store';

store.dispatch(Actions.fetchUserData());



ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
