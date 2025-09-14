// src/pages/AdminPanel.jsx
import { useState, useEffect } from 'react'
import api from '../api'

function AdminPanel() {
  const [pending, setPending] = useState([])
  const [analytics, setAnalytics] = useState({})

  useEffect(() => {
    api.get('/admin/pending').then(res => setPending(res.data))
    api.get('/admin/analytics').then(res => setAnalytics(res.data))
  }, [])

  const approve = async (id) => {
    await api.post(`/admin/approve/${id}`)
    // Refresh
  }

  const reject = async (id, reason) => {
    await api.post(`/admin/reject/${id}`, reason)
    // Refresh
  }

  // Similar for sold, delete

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Analytics</h2>
        <pre>{JSON.stringify(analytics, null, 2)}</pre>
      </div>
      <div>
        <h2 className="text-2xl mb-4">Pending Properties</h2>
        {pending.map(prop => (
          <div key={prop.pid} className="mb-4 p-4 border rounded">
            <p>{prop.property_type} - {prop.price_etb} ETB</p>
            <button onClick={() => approve(prop.pid)} className="bg-green-500 text-white px-2 py-1 mr-2">Approve</button>
            <button onClick={() => reject(prop.pid, prompt('Reason?'))} className="bg-red-500 text-white px-2 py-1">Reject</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel