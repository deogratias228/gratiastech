import axios from 'axios'

const http = axios.create({
  baseURL:         process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    Accept:         'application/json',
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('gt_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('gt_token')
      window.location.href = '/connexion'
    }
    return Promise.reject(err)
  },
)

export default http