import { Map } from 'immutable';

export default store => next => action => {
  console.log('dispatching', action);
  try {
    let result = next(action);
    console.log('next state', Map(store.getState()).toJS());

    return result;
  } catch (exception) {
    console.warn(exception);
  }
};
