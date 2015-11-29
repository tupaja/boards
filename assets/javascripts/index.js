import 'babel-core/polyfill';
import 'bootstrap/dist/css/bootstrap.css';
import '../stylesheets/index.sass';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from './containers/App';
import BoardIndex from './containers/BoardIndex';
import BoardCreate from './containers/BoardCreate';

import configureStore from './store/configureStore';
import { fetchMe } from './actions';

const store = configureStore();
const history = createBrowserHistory()

var authRequired = function(state, replaceState) {
  if (!store.getState().me.auth) {
    replaceState(null, "/")
  }
}

store.dispatch(fetchMe());
let unsubscribe = store.subscribe(() => {
  if (store.getState().me) {
    unsubscribe();
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <Route component={App}>
            <Route path="/" component={BoardIndex} />
            <Route path="create" component={BoardCreate} onEnter={authRequired} />
          </Route>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  }
});
