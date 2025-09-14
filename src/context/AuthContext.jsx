// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/auth/me').then(res => {
        setUser(res.data)
      }).catch(() => {
        localStorage.removeItem('token')
      }).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (phone, password) => {
    const res = await api.post('/auth/login', { username: phone, password })
    localStorage.setItem('token', res.data.access_token)
    const userRes = await api.get('/auth/me')
    setUser(userRes.data)
  }

  const signup = async (data) => {
    await api.post('/auth/signup', data)
    // Auto-login after signup if desired
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext