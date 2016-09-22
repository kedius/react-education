import { fork } from 'redux-saga/effects';

import contactsSaga from './contacts';

export default function* root() {
  yield [
    fork(contactsSaga)
  ];
}
