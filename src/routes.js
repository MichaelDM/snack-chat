import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App/App.js';
import Snacks from './containers/SnackList/SnackList.js';
import Login from './components/Login/Login';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Snacks} />
    <Route path="login" component={Login} />
  </Route>
);

export default routes;
