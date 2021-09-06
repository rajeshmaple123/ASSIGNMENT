import api from 'modules/api/api';
import { apiActions, API_ACTIONS } from 'modules/api/actions';
import { put, takeEvery } from 'redux-saga/effects';

export function* onApiLoad({ payload, type }) {
  const actionType = type.replace(API_ACTIONS.FETCH_START, '').toLowerCase();

  try {
    const response = yield api.fetch(actionType, payload);

    yield put(apiActions.fetchSuccess(actionType, response.data));
  } catch (e) {
    yield put(apiActions.fetchFailure(actionType, e));
  }
}

export function* watchApiLoad() {
  yield takeEvery(action => action.type.startsWith(API_ACTIONS.FETCH_START), onApiLoad);
}

const apiSaga = [
  watchApiLoad
];

export default apiSaga;
