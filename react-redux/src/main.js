import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import middlewares from './middlewares';
import reducers from './reducers';

import App from './components/app';
import ContactsList from './components/contacts-list';
import ContactForm from './components/contact-form';

const store = createStore(reducers, applyMiddleware(
  middlewares.fetcher, middlewares.logger
));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ContactsList} />
        <Route path="create" component={ContactForm} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
