import axios from './axiosInstance';

// Get Post
export const getPost = async (page) => {
  return axios
    .get(`posts?_page=${page}&_limit=5`)
    .then(function (response) {
      return response;
    })
    .catch(function (e) {
      console.log(e);
    });
};

// Add Post
export const createPost = async (payload) => {
  return axios
    .post(`posts`, payload)
    .then(function (response) {
      return response;
    })
    .catch(function (e) {
      console.log(e);
    });
};

// Update Post
export const updatePost = async (payload) => {
  return axios
    .put(`posts/${payload.id}`, payload.body)
    .then(function (response) {
      return response;
    })
    .catch(function (e) {
      console.log(e);
    });
};

// Delete Post
export const deletePost = async (id) => {
  return axios
    .delete(`posts/${id}`)
    .then(function (response) {
      return response;
    })
    .catch(function (e) {
      console.log(e);
    });
};
