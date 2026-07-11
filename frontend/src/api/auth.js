import apiClient from './client'

export function registerUser(userData) {
  return apiClient.post('/register/', userData)
}

export function loginUser(credentials) {
  return apiClient.post('/login/', credentials)
}
