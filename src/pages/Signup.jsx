// src/pages/Signup.jsx
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Signup() {
  const [formData, setFormData] = useState({
    phone_number: '',
    password: '',
    role: 'buyer',
    display_name: '',
  })
  const { signup } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup(formData)
      alert('Signup successful! Please login.')
      navigate('/login')
    } catch (err) {
      alert('Signup failed')
    }
  }

  return (
    // Updated: Replaced bg-white with bg-navy for background, added text-navy for text color
    <div className="max-w-md mx-auto bg-navy dark:bg-gray-900 p-8 rounded-xl shadow-lg mt-10 text-navy">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900 dark:text-gold-400">
        Create Your Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleChange}
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
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="buyer">Buyer</option>
            <option value="broker">Broker</option>
          </select>
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Display Name (Optional)
          </label>
          <input
            name="display_name"
            type="text"
            value={formData.display_name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg shadow hover:from-blue-700 hover:to-blue-800 transition"
        >
          Signup
        </button>
      </form>
    </div>
  )
}

export default Signup