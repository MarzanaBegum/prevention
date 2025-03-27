import axios from 'axios';

export const SERVER_URL = 'https://prevention-server-bo8a.onrender.com';

const api = axios.create({
  baseURL: SERVER_URL + '/api',
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default api;
