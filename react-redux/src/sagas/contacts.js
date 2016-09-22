import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import ApiFetch from '../utils/api-fetch';
import * as types from '../actions/contacts/types';
import * as actions from '../actions/contacts';

function* getContactsList(action) {
  yield put(actions.setIsLoading(true));

  const { contacts } = yield new ApiFetch().get('/contacts', { wait: 1000 });

  yield put(actions.setContactsList(contacts));
  yield put(actions.setIsLoading(false));
}

function* createContact(action) {
  const { contact: newContact } = action;

  try {
    const { contact } = yield new ApiFetch().post('/contacts', newContact);

    yield put(actions.addContactToList(contact));
    browserHistory.push('/');
  } catch (exception) {
    yield put(actions.setError(exception.error));
  }
}

function* updateContact(action) {
  const { contact: updatedContact } = action;

  try {
    const { contact } = yield new ApiFetch().put(`/contacts/${updatedContact.id}`, updatedContact);

    yield put(actions.updateContactInList(contact));
  } catch (exception) {
    yield put(actions.setError(exception.error));
  }
}

function* deleteContact(action) {
  const { contactId } = action;

  try {
    yield new ApiFetch().delete(`/contacts/${contactId}`);
    yield put(actions.deleteContactFromList(contactId));
  } catch (exception) {
    yield put(actions.setError(exception.error));
  }
}

export default function* contactsSaga() {
  yield [
    takeEvery(types.GET_CONTACTS_LIST, getContactsList),
    takeEvery(types.CREATE_CONTACT, createContact),
    takeEvery(types.UPDATE_CONTACT, updateContact),
    takeEvery(types.DELETE_CONTACT, deleteContact)
  ];
}
