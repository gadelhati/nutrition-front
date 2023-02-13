export const currentUserisLogged = () => {
  return localStorage.getItem('user') ? true : false;
}

export const updateLocalAccessToken = (token: any) => {
  let user = JSON.parse(`${localStorage.getItem("user")}`);
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = () => {
  return JSON.parse(`${localStorage.getItem("user")}`);
}

export const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
}

export const getLocalRefreshToken = () => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return user?.refreshToken;
}

export const getId = () => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return user?.id;
}

export const getUserName = () => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return user?.username;
}

export const getEmail = () => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return user?.email;
}

export const getRoles = () => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return user?.roles;
}

export const getLocalAccessToken = () => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return user?.accessToken;
}

export const removeToken = () => {
  localStorage.clear()
  window.location.reload()
}