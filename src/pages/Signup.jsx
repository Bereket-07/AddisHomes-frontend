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
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input name="phone_number" type="tel" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input name="password" type="password" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <select name="role" onChange={handleChange} className="w-full border p-2 rounded">
            <option value="buyer">Buyer</option>
            <option value="broker">Broker</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Display Name (Optional)</label>
          <input name="display_name" type="text" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Signup</button>
      </form>
    </div>
  )
}

export default Signup