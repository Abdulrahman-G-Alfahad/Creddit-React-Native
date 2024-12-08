import axios from "axios";
import instance from ".";

const getAllPosts = async () => {
  const response = await instance.get("/posts");
  return response.data;
};

const getPostById = async (postId) => {
  const response = await instance.get(`/posts/${postId}`);
  return response.data;
};

const createPost = async (post) => {
  const response = await instance.post("/posts", post);
  return response.data;
};

const deletePostById = async (postId) => {
  const response = await instance.delete(`/posts/${postId}`);
  return response.data;
};

const addComment = async (postId, comment) => {
  const response = await instance.post(`/posts/${postId}/comments`, comment);
  return response.data;
};

const deleteCommentById = async (commentId) => {
  const response = await instance.delete(`/posts/comments/${commentId}`);
  return response.data;
};

export {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
  addComment,
  deleteCommentById,
};
