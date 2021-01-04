import axios from 'axios';

const api = axios.create({
  baseURL: 'https://magi-chat-backend.herokuapp.com',
});

export default api;
