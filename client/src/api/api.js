// Small axios wrapper that sets the base URL and injects the JWT token
import axios from 'axios'

// For separate deployments: use full backend URL in production
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tasker-eight-sigma.vercel.app'  // Your actual backend URL
  : 'http://localhost:5000'

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
})

// Interceptor to add Authorization header when token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => Promise.reject(error))

export default api