import {put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import {deletePost, getPost} from '../../api/post';
import {
  SET_LOADING,
  SET_LOADING_REQUESTED,
  GET_POST,
  GET_POST_REQUESTED,
  DELETE_POST_REQUESTED,
  DELETE_POST,
} from '../action';

function* setLoading() {
  yield put({type: SET_LOADING});
}

function* getPostSaga({payload}) {
  const posts = yield call(getPost, payload);

  yield put({type: GET_POST, payload: posts.data});
}

function* deletePostSaga({payload}) {
  yield call(deletePost, payload);

  yield put({type: DELETE_POST, payload: payload});
}

export default function* postSaga() {
  yield takeEvery(GET_POST_REQUESTED, getPostSaga);
  yield takeEvery(DELETE_POST_REQUESTED, deletePostSaga);
  yield takeLatest(SET_LOADING_REQUESTED, setLoading);
}
