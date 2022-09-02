import {combineReducers} from 'redux';

import postReducer from '../reducer/post';

const reducer = combineReducers({
  postReducer,
});

export default reducer;
