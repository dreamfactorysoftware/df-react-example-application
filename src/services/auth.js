import axios from 'axios';

const http = axios.create({
  baseURL: window.appConfig.INSTANCE_URL,
});

const onAuthenticationSuccess = (response) => {
  if (response.data.session_token) {
    localStorage.setItem('session_token', response.data.session_token);
    // eslint-disable-next-line no-use-before-define
    auth.isAuthenticated = true;
  }

  // eslint-disable-next-line no-use-before-define
  return auth.isAuthenticated;
};

export const auth = {
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
  removeToken: () => {
    auth.isAuthenticated = false;
    localStorage.removeItem('session_token');
  },
  signout() {
    return http.delete('/api/v2/user/session')
      .then(auth.removeToken)
      .catch(auth.removeToken);
  },
  // eslint-disable-next-line camelcase
  register({ first_name, last_name, email, new_password }) {
    return http.post('/api/v2/user/register?login=true', {
      first_name,
      last_name,
      email,
      new_password,
    }).then(onAuthenticationSuccess);
  }

};
