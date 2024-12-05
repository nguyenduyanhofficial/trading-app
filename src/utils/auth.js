import { setCookie, getCookie, removeCookie } from "./cookies";

export const saveToken = (token) => {
  setCookie("jwt_token", token);
};

export const getToken = () => {
  return getCookie("jwt_token");
};

export const clearToken = () => {
  removeCookie("jwt_token");
};
