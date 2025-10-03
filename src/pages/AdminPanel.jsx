// src/pages/AdminPanel.jsx
import { useState, useEffect } from 'react'
import { carService } from '../services/propertyService'
import PropertyImage from '../components/PropertyImage'
import api from '../api'

function AdminPanel() {
  const [tab, setTab] = useState('pending') // pending | all | analytics
  const [resource, setResource] = useState('house') // house | car
  const [pending, setPending] = useState([])
  const [allProperties, setAllProperties] = useState([])
  const [cars, setCars] = useState([])
  const [pendingCars, setPendingCars] = useState([])
  const [allCars, setAllCars] = useState([])
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

  const getCounts = (data = {}) => {
    const pending = Number(data.pending || 0)
    const approved = Number(data.approved || 0)
    const rejected = Number(data.rejected || 0)
    const sold = Number(data.sold || 0)
    const total = pending + approved + rejected + sold
    const notSold = Math.max(total - sold, 0)
    return { total, pending, approved, rejected, sold, notSold }
  }

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

  const fetchPendingCars = async () => {
    const headers = { Authorization: `Bearer ${token}` }
    const res = await api.get('/admin/cars', { headers })
    const pendingCars = res.data.filter(car => car.status === 'pending')
    setPendingCars(pendingCars)
  }

  const fetchAllCars = async () => {
    const headers = { Authorization: `Bearer ${token}` }
    const res = await api.get('/admin/cars', { headers })
    setAllCars(res.data)
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
      fetchPendingCars()
      fetchAllCars()
      fetchAnalytics()
    }
  }, [token])

  useEffect(() => {
    if (resource === 'car') {
      fetchPendingCars()
      fetchAllCars()
    }
  }, [resource])

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

  // Car actions
  const approveCar = async (id) => {
    await api.post(`/admin/cars/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
    fetchPendingCars()
    fetchAllCars()
  }

  const rejectCar = async (id) => {
    const reason = prompt('Reason for rejection?')
    if (!reason) return
    await api.post(`/admin/cars/reject/${id}`, { reason }, { headers: { Authorization: `Bearer ${token}` } })
    fetchPendingCars()
    fetchAllCars()
  }

  const removeCar = async (id) => {
    await api.delete(`/admin/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    fetchPendingCars()
    fetchAllCars()
  }

  const markCarSold = async (id) => {
    await api.post(`/admin/cars/mark-sold/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
    fetchPendingCars()
    fetchAllCars()
  }

  // removed create property per requirements

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
        if (resource === 'house') {
          return pending.length ? (
            pending.map((prop) => <PropertyCard key={prop.pid} prop={prop} />)
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No pending properties.</p>
          )
        }
        // cars pending
        return pendingCars.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingCars.map(car => (
              <div key={car.cid} className="p-4 rounded-lg shadow border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-24 h-20 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    {car.images && car.images[0] ? (
                      <img src={car.images[0]} alt="car" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{car.manufacturer} {car.model_name} {car.model_year ? `(${car.model_year})` : ''}</p>
                    <p className="text-blue-700 dark:text-blue-300 font-bold">{Number(car.price_etb).toLocaleString()} ETB</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{car.car_type} • {car.motor_type || car.engine}</p>
                  </div>
                </div>
                {/* Broker info for Cars */}
                <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Broker: <span className="text-gray-900 dark:text-gray-100 font-medium">{car.broker_name || 'N/A'}</span></p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone: <span className="text-gray-900 dark:text-gray-100 font-medium">{car.broker_phone || 'N/A'}</span></p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button onClick={() => approveCar(car.cid)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Approve</button>
                  <button onClick={() => rejectCar(car.cid)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Reject</button>
                  <button onClick={() => removeCar(car.cid)} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No pending cars.</p>
        )

      case 'all':
        if (resource === 'house') {
          return allProperties.length ? (
            allProperties.map((prop) => <PropertyCard key={prop.pid} prop={prop} />)
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No properties available.</p>
          )
        }
        return allCars.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allCars.map(car => (
              <div key={car.cid} className="p-4 rounded-lg shadow border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-24 h-20 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    {car.images && car.images[0] ? (
                      <img src={car.images[0]} alt="car" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{car.manufacturer} {car.model_name} {car.model_year ? `(${car.model_year})` : ''}</p>
                    <p className="text-blue-700 dark:text-blue-300 font-bold">{Number(car.price_etb).toLocaleString()} ETB</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{car.car_type} • {car.motor_type || car.engine}</p>
                  </div>
                </div>
                {/* Broker info for Cars */}
                <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Broker: <span className="text-gray-900 dark:text-gray-100 font-medium">{car.broker_name || 'N/A'}</span></p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone: <span className="text-gray-900 dark:text-gray-100 font-medium">{car.broker_phone || 'N/A'}</span></p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button onClick={() => markCarSold(car.cid)} className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded">Mark Sold</button>
                  <button onClick={() => removeCar(car.cid)} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No cars available.</p>
        )

      // create tab removed

      case 'analytics':
        const propCounts = getCounts(analytics.properties || {})
        const carCounts = getCounts(analytics.cars || {})
        const Card = ({ label, value }) => (
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-center shadow">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-gold-400">{value}</div>
          </div>
        )
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white-900 dark:text-gold-400">Property Analytics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <Card label="Total" value={propCounts.total} />
                <Card label="Pending" value={propCounts.pending} />
                <Card label="Approved" value={propCounts.approved} />
                <Card label="Rejected" value={propCounts.rejected} />
                <Card label="Sold" value={propCounts.sold} />
                <Card label="Not Sold" value={propCounts.notSold} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white-900 dark:text-gold-400">Car Analytics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <Card label="Total" value={carCounts.total} />
                <Card label="Pending" value={carCounts.pending} />
                <Card label="Approved" value={carCounts.approved} />
                <Card label="Rejected" value={carCounts.rejected} />
                <Card label="Sold" value={carCounts.sold} />
                <Card label="Not Sold" value={carCounts.notSold} />
              </div>
            </div>
          </div>
        )
// like i mean the house property that is submitted from website and it is approved by admin so it is threre in the website when u browse there is it but when i browse in the telegram the one that is there in the website is not there only the one that is upploaded on the telegam only rendered
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

      {/* Resource selector */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm">Manage:</span>
        <select value={resource} onChange={(e) => setResource(e.target.value)} className="border rounded p-2">
          <option value="house">Houses</option>
          <option value="car">Cars</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['pending', 'all', 'analytics'].map((t) => (
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

      {resource === 'car' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Cars</h2>
          {cars.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No cars yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cars.map(car => (
                <div key={car.cid} className="p-4 rounded-lg shadow border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-24 h-20 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                      {car.images && car.images[0] ? (
                        <img src={car.images[0]} alt="car" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{car.manufacturer} {car.model_name} {car.model_year ? `(${car.model_year})` : ''}</p>
                      <p className="text-blue-700 dark:text-blue-300 font-bold">{Number(car.price_etb).toLocaleString()} ETB</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{car.car_type} • {car.motor_type || car.engine}</p>
                    </div>
                  </div>
                  {/* Car moderation actions */}
                  {car.status === 'pending' && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button onClick={async () => { await api.post(`/admin/cars/approve/${car.cid}`, {}, { headers: { Authorization: `Bearer ${token}` } }); setCars(await carService.getCars()) }} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Approve</button>
                      <button onClick={async () => { await api.post(`/admin/cars/reject/${car.cid}`, {}, { headers: { Authorization: `Bearer ${token}` } }); setCars(await carService.getCars()) }} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminPanel