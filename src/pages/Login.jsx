// src/pages/Login.jsx
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(phone, password)
      navigate('/')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    // Updated: Replaced bg-white with bg-navy
    <div className="max-w-md mx-auto bg-navy dark:bg-gray-900 p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900 dark:text-gold-400">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg shadow hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg"
        >
          Login
        </button>
      </form>

      {/* Footer links */}
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don’t have an account?{' '}
        <Link
          to="/signup"
          className="font-semibold text-blue-600 dark:text-gold-400 hover:underline"
        >
          Signup
        </Link>
      </p>
    </div>
  )
}

export default Login