import axios from 'axios';

const dreamFactory = () => {
  const token = localStorage.getItem('session_token');

  if (!token) {
    throw Error('Not logged in');
    return;
  }

  return axios.create({
    baseURL: window.appConfig.INSTANCE_URL,
    headers: {
      'X-DreamFactory-API-Key': window.appConfig.APP_API_KEY,
      'X-DreamFactory-Session-Token': token,
    },
  })
};

export default dreamFactory;
