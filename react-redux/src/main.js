import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import reducers from './reducers';
import sagas from './sagas';

import App from './components/app';
import ContactList from './components/contact-list';
import ContactForm from './components/contact-form';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(
  sagaMiddleware
));

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ContactList} />
        <Route path="list" component={ContactList} />
        <Route path="add" component={ContactForm} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
