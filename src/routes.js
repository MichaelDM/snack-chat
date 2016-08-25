import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App/App.js';
import Snacks from './containers/SnackList/SnackList.js';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Snacks}/>
  </Route>
);

export default routes;
