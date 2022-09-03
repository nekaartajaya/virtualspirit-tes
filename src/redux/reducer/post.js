import {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  SET_LOADING,
  SET_LOADING_CUD,
  UPDATE_POST,
} from '../action';

const initState = {
  posts: [],
  loading: false,
  loadingCUD: false,
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
    case SET_LOADING_CUD:
      return {
        ...state,
        loadingCUD: true,
      };
    case CREATE_POST: {
      return {
        ...state,
        posts: [payload, ...state.posts],
        loadingCUD: false,
      };
    }
    case UPDATE_POST: {
      const objIndex = state.posts.findIndex((obj) => obj.id === payload.id);
      state.posts[objIndex].title = payload.body.title;
      state.posts[objIndex].body = payload.body.body;
      return {
        ...state,
        posts: state.posts,
        loadingCUD: false,
      };
    }
    case DELETE_POST: {
      state.posts.splice(
        state.posts.findIndex((obj) => obj.id === payload),
        1,
      );
      return {
        ...state,
        posts: state.posts,
        loadingCUD: false,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
