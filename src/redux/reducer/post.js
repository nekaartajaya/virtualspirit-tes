import {DELETE_POST, DELETE_POST_REQUESTED, GET_POST, SET_LOADING} from '../action';

const initState = {
  posts: [],
  loading: false,
};

const postReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case GET_POST:
      return {
        ...state,
        posts: [...state.posts, ...payload],
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_POST_REQUESTED: {
      state.posts.splice(
        state.posts.findIndex((obj) => obj.id === payload),
        1,
      );
      return {
        ...state,
        posts: state.posts,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
