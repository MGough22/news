import axios from "axios";

const api = axios.create({
  baseURL: "https://res-borealis.onrender.com/api",
});

export const getArticles = async () => {
  return api.get("/articles");
};

export const getArticleData = async id => {
  return api.get(`/articles/${id}`);
};

export const getArticleComments = async id => {
  return api.get(`/articles/${id}/comments`);
};

export const getUsers = async () => {
  return api.get("/users");
};

export const getUserData = async author => {
  return api.get(`/users/${author}`);
};
