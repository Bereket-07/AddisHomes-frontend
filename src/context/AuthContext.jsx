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
      api
        .get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setUser(res.data)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (phone, password) => {
  const res = await api.post('/auth/login', {
    phone_number: phone,
    password: password
  })

  const token = res.data.access_token
  localStorage.setItem('token', token)

  const userRes = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
  setUser(userRes.data)
  }


  const signup = async (data) => {
    await api.post('/auth/signup', data)
    // Optional: login immediately after signup
    // await login(data.phone_number, data.password)
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
