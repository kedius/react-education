import Immutable from 'immutable';
import * as types from '../actions/contacts/types';

const initialState = Immutable.fromJS({
  list: [],
  isLoading: false,
  error: null
});

const reducers = {
  [types.SET_ERROR]: (state, action) => {
    return state.set('error', action.error);
  },

  [types.SET_IS_LOADING]: (state, action) => {
    return state.set('isLoading', action.loading);
  },

  [types.GET_CONTACTS_LIST]: (state, action) => {
    const { contacts, error } = action.result;

    if (error) {
      return state.set('error', error);
    }

    return state.set('list', Immutable.fromJS(contacts));
  },

  [types.CREATE_CONTACT]: (state, action) => {
    const { contact, error } = action.result;

    if (error) {
      return state.set('error', error);
    }

    const updatedList = state.get('list')
      .push(Immutable.fromJS(contact));

    return state.set('list', updatedList);
  },

  [types.UPDATE_CONTACT]: (state, action) => {
    const { contact, error } = action.result;

    if (error) {
      return state.set('error', error);
    }

    const updatedList = state.get('list').map(_contact => {
      return _contact.get('id') === contact.id
        ? Immutable.fromJS(contact)
        : _contact;
    });

    return state.set('list', updatedList);
  },

  [types.DELETE_CONTACT]: (state, action) => {
    const { error } = action.result;

    if (error) {
      return state.set('error', error);
    }

    const updatedList = state.get('list')
      .filter(contact => contact.get('id') !== action.contactId);

    return state.set('list', updatedList);
  }
};

export default (state = initialState, action) => {
  const reducer = reducers[action.type];

  return reducer ? reducer(state, action) : state;
};
