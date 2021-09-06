import { all, call } from 'redux-saga/effects';
import apiSaga from 'modules/api/saga';

const sagas = [
  ...apiSaga,
];

export function* root() {
  yield all(sagas.map((saga) => call(saga)));
}
