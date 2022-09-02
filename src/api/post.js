import axios from './axiosInstance';

// Get Post
export const getPost = async (page) => {
  return axios
    .get(`posts?_page=${page}`)
    .then(function (response) {
      return response;
    })
    .catch(function (e) {
      console.log(e);
    });
};
