import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

import store from './store';
import { setCurrentUser } from './store/actions/auth';

import jwtDecode from 'jwt-decode';
import { jsonWebToken } from './services/config';
import cache from './utils/cache';

import './utils/axios';

import './styles/index.styl';
import { receiveMessage } from './store/actions/message';

if (cache.getItem(jsonWebToken)) {
  store.dispatch(receiveMessage());
  store.dispatch(setCurrentUser(jwtDecode(cache.getItem(jsonWebToken))));
}

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      { routes }
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
