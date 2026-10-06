import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API Base URL
});

// Request එකක් යවන විට Token එකක් ඇත්නම් Header එකට එකතු කිරීම
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;