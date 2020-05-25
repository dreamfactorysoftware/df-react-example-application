import axios from 'axios';

const http = axios.create({
  baseURL: window.appConfig.INSTANCE_URL,
});

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
