import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import logger from './utils/logger';
import reducers from './reducers';
import sagas from './sagas';

import App from './components/app';
import ContactsList from './components/contacts-list';
import ContactForm from './components/contact-form';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(
  sagaMiddleware, logger
));

sagaMiddleware.run(sagas);

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
