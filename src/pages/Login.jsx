// src/pages/Login.jsx
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import LanguageContext from '../context/LanguageContext'
import ThemeContext from '../context/ThemeContext'

function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const { t } = useContext(LanguageContext)
  const { darkMode } = useContext(ThemeContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(phone, password)
      navigate('/')
    } catch (err) {
      alert(t('error'))
    }
  }

  return (
    <div
      className="max-w-md mx-auto p-8 rounded-xl shadow-lg mt-10 border text-gray-900 dark:text-gray-100"
      style={{
        backgroundColor: darkMode ? '#111827' : '#ffffff',
        borderColor: darkMode ? '#374151' : '#e5e7eb'
      }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gold-400">
        {t('login')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('phone_number') || 'Phone Number'}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('password') || 'Password'}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-black font-semibold py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-xl border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {t('login')}
        </button>
      </form>

      {/* Footer links */}
      <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
        {t('dont_have_account') || "Don’t have an account?"}{' '}
        <Link
          to="/signup"
          className="font-semibold text-blue-600 dark:text-gold-400 hover:underline"
        >
          {t('signup')}
        </Link>
      </p>
    </div>
  )
}

export default Login