import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

api.defaults.headers.common.Authorization =
  'Bearer e15ed1ec823c057608125b881757a76a4e79e1b7';

export default api;
