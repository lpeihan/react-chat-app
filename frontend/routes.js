import React from 'react';

import { Route } from 'react-router-dom';

import App from './pages/app';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Auth from './pages/auth/auth';
import My from './pages/my/my';

export default (
  <div>
    <Route exact path="/" component={ Auth(App) } />
    <Route path="/login" component={ Login } />
    <Route path="/signup" component={ Signup } />
    <Route path="/my" component={ Auth(My) } />
  </div>
);
