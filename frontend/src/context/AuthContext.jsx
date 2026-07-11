import { useCallback, useMemo, useState } from 'react'
import { loginUser, registerUser } from '../api/auth'
import {
  clearTokens,
  getAccessToken,
  getStoredUsername,
  saveTokens,
} from '../utils/tokenStorage'
import AuthContext from './authContext'

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => getAccessToken())
  const [username, setUsername] = useState(() => getStoredUsername())

  const register = useCallback(async (formData) => {
    await registerUser(formData)
  }, [])

  const login = useCallback(async ({ username: loginUsername, password }) => {
    const response = await loginUser({ username: loginUsername, password })

    saveTokens({
      access: response.data.access,
      refresh: response.data.refresh,
      username: loginUsername,
    })

    setAccessToken(response.data.access)
    setUsername(loginUsername)
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    setAccessToken(null)
    setUsername(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(accessToken),
      username,
      register,
      login,
      logout,
    }),
    [accessToken, username, register, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
