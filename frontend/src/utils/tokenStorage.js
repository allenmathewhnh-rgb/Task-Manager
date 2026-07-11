const ACCESS_TOKEN_KEY = 'task_manager_access_token'
const REFRESH_TOKEN_KEY = 'task_manager_refresh_token'
const USERNAME_KEY = 'task_manager_username'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function getStoredUsername() {
  return localStorage.getItem(USERNAME_KEY)
}

export function saveTokens({ access, refresh, username }) {
  if (access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
  }

  if (refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  }

  if (username) {
    localStorage.setItem(USERNAME_KEY, username)
  }
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USERNAME_KEY)
}
