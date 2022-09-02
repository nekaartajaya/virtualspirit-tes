import {put, call, takeEvery} from 'redux-saga/effects';
import {getPost} from '../../api/post';
import {GET_POST, GET_POST_REQUESTED} from '../action';

function* getPostSaga({payload}) {
  const posts = yield call(getPost, payload);

  yield put({type: GET_POST, payload: posts});
}

export default function* postSaga() {
  yield takeEvery(GET_POST_REQUESTED, getPostSaga);
}
