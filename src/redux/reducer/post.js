import {GET_POST} from '../action';

const initState = {
  posts: [],
};

const postReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case GET_POST:
      return {
        ...state,
        posts: payload,
      };
    default:
      return state;
  }
};

export default postReducer;
