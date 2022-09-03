import {put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import {createPost, deletePost, getPost, updatePost} from '../../api/post';
import {
  SET_LOADING,
  GET_POST,
  GET_POST_REQUESTED,
  DELETE_POST_REQUESTED,
  DELETE_POST,
  SET_LOADING_CUD,
  UPDATE_POST_REQUESTED,
  UPDATE_POST,
  CREATE_POST,
  CREATE_POST_REQUESTED,
} from '../action';

function* getPostSaga({payload}) {
  yield put({type: SET_LOADING});

  const posts = yield call(getPost, payload);

  yield put({type: GET_POST, payload: posts.data});
}

function* createPostSaga({payload}) {
  yield put({type: SET_LOADING_CUD});

  yield call(createPost, payload);

  yield put({type: CREATE_POST, payload: payload});
}

function* updatePostSaga({payload}) {
  yield put({type: SET_LOADING_CUD});

  yield call(updatePost, payload);

  yield put({type: UPDATE_POST, payload: payload});
}

function* deletePostSaga({payload}) {
  yield put({type: SET_LOADING_CUD});

  yield call(deletePost, payload);

  yield put({type: DELETE_POST, payload: payload});
}

export default function* postSaga() {
  yield takeEvery(GET_POST_REQUESTED, getPostSaga);
  yield takeLatest(CREATE_POST_REQUESTED, createPostSaga);
  yield takeEvery(UPDATE_POST_REQUESTED, updatePostSaga);
  yield takeEvery(DELETE_POST_REQUESTED, deletePostSaga);
}
