// src/pages/AdminPanel.jsx
import { useState, useEffect } from 'react'
import PropertyImage from '../components/PropertyImage'
import api from '../api'

function AdminPanel() {
  const [tab, setTab] = useState('pending') // pending | all | create | analytics
  const [pending, setPending] = useState([])
  const [allProperties, setAllProperties] = useState([])
  const [analytics, setAnalytics] = useState({})
  const [newProperty, setNewProperty] = useState({
    property_type: '',
    price_etb: 0,
    bedrooms: 1,
    bathrooms: 1,
    description: '',
    image_urls: [],
    broker_name: '',
    broker_phone: '',
  })
  const token = localStorage.getItem('token')

  // ------------------- Fetch Data -------------------
  const fetchPending = async () => {
    const headers = { Authorization: `Bearer ${token}` }
    const res = await api.get('/admin/pending', { headers })
    setPending(res.data)
  }

  const fetchAllProperties = async () => {
    const headers = { Authorization: `Bearer ${token}` }
    const res = await api.get('/admin/properties', { headers })
    setAllProperties(res.data)
  }

  const fetchAnalytics = async () => {
    const headers = { Authorization: `Bearer ${token}` }
    const res = await api.get('/admin/analytics', { headers })
    setAnalytics(res.data)
  }

  useEffect(() => {
    if (token) {
      fetchPending()
      fetchAllProperties()
      fetchAnalytics()
    }
  }, [token])

  // ------------------- Admin Actions -------------------
  const approve = async (id) => {
    await api.post(`/admin/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
    fetchPending()
    fetchAllProperties()
  }

  const reject = async (id) => {
    const reason = prompt('Reason for rejection?')
    if (!reason) return
    await api.post(`/admin/reject/${id}`, { reason }, { headers: { Authorization: `Bearer ${token}` } })
    fetchPending()
    fetchAllProperties()
  }

  const markSold = async (id) => {
    await api.post(`/admin/mark-sold/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
    fetchPending()
    fetchAllProperties()
  }

  const removeProperty = async (id) => {
    await api.delete(`/admin/properties/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    fetchPending()
    fetchAllProperties()
  }

  const createProperty = async () => {
    await api.post('/admin/properties', newProperty, { headers: { Authorization: `Bearer ${token}` } })
    setNewProperty({
      property_type: '',
      price_etb: 0,
      bedrooms: 1,
      bathrooms: 1,
      description: '',
      image_urls: [],
      broker_name: '',
      broker_phone: '',
    })
    fetchAllProperties()
  }

  // ------------------- Render Property Card -------------------
  // Updated PropertyCard component
  const PropertyCard = ({ prop, showActions = true }) => (
    <div className="mb-4 p-4 rounded-lg shadow border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* Header with image and key info */}
      <div className="flex items-start gap-4 mb-3">
        <div className="w-24 h-20 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <PropertyImage
            src={prop.image_urls?.[0]}
            alt={prop.property_type}
            className="w-full h-full object-cover"
            fallbackText="No Image"
          />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 dark:text-white">
            {prop.property_type} • {prop.status}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {prop.location?.site ? `${prop.location.site}, ` : ''}{prop.location?.region}
          </p>
          <p className="text-blue-700 dark:text-blue-300 font-bold">
            {prop.price_etb?.toLocaleString?.() || prop.price_etb} ETB
          </p>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
        <div className="text-gray-600 dark:text-gray-400">Bedrooms: <span className="text-gray-900 dark:text-gray-100 font-medium">{prop.bedrooms ?? 'N/A'}</span></div>
        <div className="text-gray-600 dark:text-gray-400">Bathrooms: <span className="text-gray-900 dark:text-gray-100 font-medium">{prop.bathrooms ?? 'N/A'}</span></div>
        <div className="text-gray-600 dark:text-gray-400">Size: <span className="text-gray-900 dark:text-gray-100 font-medium">{prop.size_sqm ? `${prop.size_sqm} m²` : 'N/A'}</span></div>
        <div className="text-gray-600 dark:text-gray-400">Furnishing: <span className="text-gray-900 dark:text-gray-100 font-medium">{prop.furnishing_status || 'N/A'}</span></div>
        <div className="text-gray-600 dark:text-gray-400">Condo Scheme: <span className="text-gray-900 dark:text-gray-100 font-medium">{prop.condominium_scheme || 'N/A'}</span></div>
        <div className="text-gray-600 dark:text-gray-400">Per SQM: <span className="text-gray-900 dark:text-gray-100 font-medium">{prop.size_sqm ? Math.round(prop.price_etb / prop.size_sqm).toLocaleString() : 'N/A'}</span></div>
      </div>

      {/* Broker info */}
      <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">Broker: <span className="text-gray-900 dark:text-gray-100 font-medium">{prop.broker_name || 'N/A'}</span></p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Phone: <span className="text-gray-900 dark:text-gray-100 font-medium">{prop.broker_phone || 'N/A'}</span></p>
        {prop.created_at && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Created: {new Date(prop.created_at).toLocaleString()}</p>
        )}
      </div>

      {showActions && (
        <div className="flex flex-wrap gap-2 mt-3">
          {prop.status === 'pending' && (
            <>
              <button
                onClick={() => approve(prop.pid)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  const reason = prompt('Please enter the reason for rejection:');
                  if (reason) reject(prop.pid, reason);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </>
          )}
          {prop.status === 'approved' && (
            <button
              onClick={() => markSold(prop.pid)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
            >
              Mark Sold
            </button>
          )}
          <button
            onClick={() => removeProperty(prop.pid)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )

  // ------------------- Tabs -------------------
  const renderTabContent = () => {
    switch (tab) {
      case 'pending':
        return pending.length ? (
          pending.map((prop) => <PropertyCard key={prop.pid} prop={prop} />)
        ) : (
          // Updated text color for empty state
          <p className="text-gray-700 dark:text-gray-300">No pending properties.</p>
        )

      case 'all':
        return allProperties.length ? (
          allProperties.map((prop) => <PropertyCard key={prop.pid} prop={prop} />)
        ) : (
          // Updated text color for empty state
          <p className="text-gray-700 dark:text-gray-300">No properties available.</p>
        )

      case 'create':
        return (
          // Updated main div: bg-navy uses --primary, dark:bg-gray-800 for explicit dark bg
          <div className="p-6 rounded-lg shadow border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 max-w-md">
            {/* Updated heading text color */}
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gold-400">
              Create New Property
            </h3>
            {Object.keys(newProperty).map((key) => (
              <div key={key} className="mb-3">
                {/* Updated label text color */}
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  {key}
                </label>
                <input
                  type={typeof newProperty[key] === 'number' ? 'number' : 'text'}
                  value={newProperty[key]}
                  onChange={(e) =>
                    setNewProperty((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  // Updated input background for dark mode
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
            <button
              onClick={createProperty}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-3"
            >
              Create Property
            </button>
          </div>
        )

      case 'analytics':
        return (
          // Updated main div: bg-navy uses --primary, dark:bg-gray-800 for explicit dark bg
          <div className="p-6 rounded-lg shadow border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 max-w-md">
            {/* Updated heading text color */}
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gold-400">
              Analytics
            </h3>
            {/* Updated pre background and text colors */}
            <pre className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(analytics, null, 2)}
            </pre>
          </div>
        )

      default:
        return null
    }
  }

  return (
    // Updated main container div: bg-navy uses --primary, dark:bg-gray-900 for explicit dark bg
    // text-navy uses --text variable, dark:text-gray-100 for explicit dark text
    <div className="max-w-5xl mx-auto p-6 bg-white text-gray-900 border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
      {/* Updated main heading text color */}
      <h1 className="text-3xl font-bold mb-6 text-blue-900 dark:text-gold-400">
        Admin Panel
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['pending', 'all', 'create', 'analytics'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            // Updated button colors for dark mode consistency
            className={`px-4 py-2 rounded-lg font-medium transition ${tab === t
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  )
}

export default AdminPanel