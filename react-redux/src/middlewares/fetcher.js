import { browserHistory } from 'react-router';

const loadingAction = (type, loading) => ({
  type, loading
});

const errorAction = (type, error) => ({
  type, error
});

export default store => next => action => {
  if (action.promise && action.promise instanceof Promise) {
    if (action.loaderType) {
      next(loadingAction(action.loaderType, true));
    }

    action.promise
      .then(result => {
        return new Promise((resolve, reject) => {
          result.ok
            ? resolve(result.json())
            : result.json().then(reject);
        });
      })
      .then(json => {
        action.result = json;
        next(action);

        if (action.loaderType) {
          next(loadingAction(action.loaderType, false));
        }

        if (action.redirect) {
          browserHistory.push(action.redirect);
        }
      })
      .catch(error => {
        if (action.loaderType) {
          next(loadingAction(action.loaderType, false));
        }

        if (action.errorType) {
          next(errorAction(action.errorType, error.message));
        } else {
          console.warn(error);
        }
      });
  } else {
    next(action);

    if (action.redirect) {
      browserHistory.push(action.redirect);
    }
  }
};
