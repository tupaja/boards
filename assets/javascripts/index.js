import 'babel-core/polyfill';
import 'bootstrap/dist/css/bootstrap.css';
import '../stylesheets/index.sass';

import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, DefaultRoute } from 'react-router';

import App from './containers/App';
import BoardIndex from './containers/BoardIndex';
import BoardCreate from './containers/BoardCreate';

import configureStore from './store/configureStore';

const store = configureStore();
let history = new BrowserHistory();

React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route component={App}>
          <Route path="/" component={BoardIndex} />
          <Route path="create" component={BoardCreate} />
        </Route>
      </Router>
    }
  </Provider>,
  document.getElementById('root')
);
