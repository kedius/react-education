import * as types from './types';

export const setError = (error = null) => {
  return {
    type: types.SET_ERROR,
    error
  };
};

export const setIsLoading = (isLoading = true) => {
  return {
    type: types.SET_IS_LOADING,
    isLoading
  };
};

export const setContactsList = contacts => {
  return {
    type: types.SET_CONTACTS_LIST,
    contacts
  };
};

export const addContactToList = contact => {
  return {
    type: types.ADD_CONTACT_TO_LIST,
    contact
  };
};

export const updateContactInList = contact => {
  return {
    type: types.UPDATE_CONTACT_IN_LIST,
    contact
  };
};

export const deleteContactFromList = contactId => {
  return {
    type: types.DELETE_CONTACT_FROM_LIST,
    contactId
  };
};

export const getContactsList = () => {
  return {
    type: types.SET_CONTACTS_LIST,
    promise: fetch('http://localhost:3000/contacts', {
      method: 'GET'
    })
  };
};

export const createContact = contact => {
  return {
    type: types.CREATE_CONTACT,
    contact
  };
};

export const updateContact = contact => {
  return {
    type: types.UPDATE_CONTACT,
    contact
  };
};

export const deleteContact = contactId => {
  return {
    type: types.DELETE_CONTACT,
    contactId
  };
};
