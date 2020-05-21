import axios from 'axios';

const http = axios.create({
  baseURL: window.appConfig.INSTANCE_URL,
});

const devErrorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

const onAuthenticationSuccess = (response) => {
  var session_token = response.data.session_token;
  localStorage.setItem('session_token', session_token);
  auth.isAuthenticated = true;
}

export const removeToken = () => {
  auth.isAuthenticated = false;
  localStorage.removeItem('session_token');
}

const auth = {
  isAuthenticated: !!localStorage.getItem('session_token'),
  authenticate(email, password) {
    return http.post('/api/v2/user/session', {
      email,
      password,
    }).then(onAuthenticationSuccess)
      .catch((error) => {
        auth.isAuthenticated = false;
        throw error;
      });
  },
  signout() {
    return http.delete('/api/v2/user/session')
      .then(removeToken)
      .catch(removeToken);
  },
  register({ first_name, last_name, email, new_password }) {
    return http.post('/api/v2/user/register?login=true', {
      first_name,
      last_name,
      email,
      new_password,
    }).then(onAuthenticationSuccess);
  }
};

export default auth;
