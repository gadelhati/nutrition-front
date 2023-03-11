export const getTokenPayload = () => {
  var token = getToken().accessToken
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
  //{"iss":"","sub":"","nbf":,"iat":timestamp,"exp":timestamp,"aud":""}
}

export const isValidToken = () => {
  return (getTokenPayload().exp < new Date().getTime() ? true : false)
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