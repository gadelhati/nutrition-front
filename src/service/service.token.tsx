export const currentUserisLogged = () => {
  return localStorage.getItem(`token`) ? true : false;
}

export const getToken = () => {
  return JSON.parse(`${localStorage.getItem(`token`)}`);
}

export const setToken = (token: any) => {
  localStorage.setItem(`token`, JSON.stringify(token));
}

export const getLocalAccessToken = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.accessToken;
}

export const getLocalTokenType = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.tokenType;
}

export const getUserName = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.username;
}

export const getRoles = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.roles;
}

export const removeToken = () => {
  localStorage.clear()
  window.location.reload()
}