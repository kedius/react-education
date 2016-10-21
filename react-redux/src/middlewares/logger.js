import { Map } from 'immutable';

export default store => next => action => {
  console.log('Action:', action);
  next(action);
  console.log('Next State:', Map(store.getState()).toJS());
};
