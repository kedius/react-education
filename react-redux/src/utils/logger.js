import { Map } from 'immutable';

export default store => next => action => {
  console.log('dispatching', action);

  if (action.promise) {
    action.promise
      .then(res => {
        return new Promise((resolve, reject) => {
          res.ok ? resolve(res.json()) : res.text().then(reject);
        });
      })
      .then(json => {
        action.res = json;
        next(action);
      })
      .catch(error => {
        console.warn(error);
      })
  } else {
    next(action);
  }

  console.log('next state', Map(store.getState()).toJS());
};
