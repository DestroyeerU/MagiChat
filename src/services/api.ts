import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // baseURL: 'https://magi-chat-backend.herokuapp.com',
});

export function saveApiDefaultAuthorization(token: string) {
  api.defaults.headers = { authorization: `Bearer ${token}` };
}

export default api;
