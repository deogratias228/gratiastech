import axios from 'axios';

const libAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://gratiastech.onrender.com/', // inline
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default libAxios;