import Immutable from 'immutable';
import * as types from '../actions/contacts/types';

const initialState = {
  list: [],
  isLoading: false
};

const reducers = {
  [types.SET_IS_LOADING]: (state, action) => {
    return state.set('isLoading', action.isLoading);
  },

  [types.SET_CONTACTS_LIST]: (state, action) => {
    return state.set('list', action.list);
  },

  [types.ADD_CONTACT_TO_LIST]: (state, action) => {
    const updatedList = state.get('list').push(action.contact);

    return state.set('list', updatedList);
  },

  [types.UPDATE_CONTACT_IN_LIST]: (state, action) => {
    const updatedList = state.get('list').map(contact => {
      return contact.id === action.contact.id ? action.contact : contact;
    });

    return state.set('list', updatedList);
  },

  [types.DELETE_CONTACT_FROM_LIST]: (state, action) => {
    const updatedList = state.get('list')
      .filter(contact => contact.id !== action.contactId);

    return state.set('list', updatedList);
  }
};

export default (state = initialState, action) => {
  const reducer = reducers[action.type];

  return reducer ? reducer(state, action) : state;
};
