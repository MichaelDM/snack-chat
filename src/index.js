import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {Router, browserHistory} from 'react-router'
import routes from './routes';

const storeWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={storeWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.body.querySelector('.container') // would use document.getElementById ... faster than querySelector
)
