import {spawn} from 'redux-saga/effects';

// Sagas
import postSaga from './post';

// Export the root saga
export default function* rootSaga() {
  console.log('Hello From Redux-Saga!');

  yield spawn(postSaga);
}
