export const currentUserisLogged = () => {
  return localStorage.getItem(`token`) ? true : false;
}

export const getToken = () => {
  return JSON.parse(`${localStorage.getItem(`token`)}`);
}

export const setToken = (token: any) => {
  localStorage.setItem(`token`, JSON.stringify(token));
}

export const getLocalRefreshToken = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.refreshToken;
}

export const getId = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.id;
}

export const getUserName = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.username;
}

export const getEmail = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.email;
}

export const getRoles = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.roles;
}

export const getLocalAccessToken = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.accessToken;
}

export const removeToken = () => {
  localStorage.clear()
  window.location.reload()
}