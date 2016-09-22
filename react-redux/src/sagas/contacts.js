import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as types from '../actions/contacts/types';
import * as actions from '../actions/contacts';

function* getContactsList(action) {
  yield put(actions.setIsLoading(true));

  try {
    const { contacts } = yield fetch('http://localhost:3000/contacts', {
      method: 'GET'
    });

    yield put(actions.setContactsList(contacts));
  } catch (exception) {
    console.warn(exception);
  }

  yield put(action.setIsLoading(false));
}

function* createContact(action) {
  const { contact: newContact } = action;

  try {
    const { contact } = yield fetch('http://localhost:3000/contacts', {
      method: 'POST',
      body: JSON.stringify(newContact)
    });

    put(actions.addContactToList(contact));
  } catch (exception) {
    console.warn(exception);
  }
}

function* updateContact(action) {
  const { contact: updatedContact } = action;

  try {
    const { contact } = yield fetch(`http://localhost:3000/contacts/${updatedContact.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedContact)
    });

    put(actions.updateContactInList(contact));
  } catch (exception) {
    console.warn(exception);
  }
}

function* deleteContact(action) {
  const { contactId } = action;

  try {
    yield fetch(`http://localhost:3000/contacts/${contactId}`, {
      method: 'DELETE'
    });

    yield put(actions.deleteContactFromList(contactId));
  } catch (exception) {
    console.warn(exception);
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
