import * as types from './types';
import ApiFetch from '../../utils/api-fetch';

export const getContactsList = () => {
  return {
    type: types.GET_CONTACTS_LIST,
    promise: new ApiFetch().get('/contacts', { wait: 1000 }),
    loaderType: types.SET_IS_LOADING,
    errorType: types.SET_ERROR
  };
};

export const createContact = contact => {
  return {
    type: types.CREATE_CONTACT,
    promise: new ApiFetch().post('/contacts', contact),
    errorType: types.SET_ERROR,
    redirect: '/'
  };
};

export const updateContact = contact => {
  return {
    type: types.UPDATE_CONTACT,
    promise: new ApiFetch().put(`/contacts/${contact.id}`, contact),
    errorType: types.SET_ERROR
  };
};

export const deleteContact = contactId => {
  return {
    type: types.DELETE_CONTACT,
    promise: new ApiFetch().delete(`/contacts/${contactId}`),
    errorType: types.SET_ERROR,
    contactId
  };
};
