import axios from 'axios'
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from '../utils/tokenStorage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const isUnauthorized = error.response?.status === 401
    const isAuthRequest =
      originalRequest?.url?.includes('/login/') ||
      originalRequest?.url?.includes('/register/') ||
      originalRequest?.url?.includes('/refresh/')

    if (!isUnauthorized || originalRequest?._retry || isAuthRequest) {
      return Promise.reject(error)
    }

    const refresh = getRefreshToken()

    if (!refresh) {
      clearTokens()
      return Promise.reject(error)
    }

    try {
      originalRequest._retry = true
      const response = await axios.post(`${API_BASE_URL}/refresh/`, { refresh })
      saveTokens({ access: response.data.access })
      originalRequest.headers.Authorization = `Bearer ${response.data.access}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      clearTokens()
      window.location.assign('/login')
      return Promise.reject(refreshError)
    }
  },
)

export default apiClient
