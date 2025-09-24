// src/pages/MyListings.jsx (Updated similarly with views)
import { useState, useEffect, useContext } from 'react'
import api from '../api'
import PropertyCard from '../components/PropertyCard'
import PropertyTable from '../components/PropertyTable'
import { GridIcon, TableIcon, AlertCircleIcon } from 'lucide-react'
import * as XLSX from 'xlsx'
import LanguageContext from '../context/LanguageContext'

function MyListings() {
  const { t } = useContext(LanguageContext)
  const [properties, setProperties] = useState([])
  const [view, setView] = useState('card')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMyProperties()
  }, [])

  const fetchMyProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/properties/me')
      console.log('My properties response:', response.data) // Debug log
      setProperties(response.data || [])
    } catch (err) {
      console.error('Error fetching my properties:', err)
      setError('Failed to load your properties. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'My Listings')
    XLSX.writeFile(wb, 'my_listings.xlsx')
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading_properties')}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircleIcon size={48} className="mx-auto text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Error Loading Properties
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={fetchMyProperties}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-indigo-900 dark:text-gold-300 mb-2">{t('my_listings')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('manage_my_listings') || 'Manage and view all your submitted properties'}
        </p>
      </div>

      {/* Desktop View toggle */}
      <div className="hidden md:flex justify-end mb-6">
        <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 shadow-lg">
          <button
            onClick={() => setView('card')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${view === 'card'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
          >
            <GridIcon size={16} className="mr-2" />
            <span>{t('cards')}</span>
          </button>
          <button
            onClick={() => setView('table')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${view === 'table'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
          >
            <TableIcon size={16} className="mr-2" />
            <span>{t('table')}</span>
          </button>
        </div>
      </div>

      {/* Mobile View toggle */}
      <div className="fixed top-20 right-4 z-40 md:hidden">
        <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-xl border border-gray-200 dark:border-gray-600 backdrop-blur-sm">
          <button
            onClick={() => setView('card')}
            className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${view === 'card'
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg transform scale-105'
              : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
          >
            <GridIcon size={16} className="mr-1.5" />
            <span className="font-medium">{t('cards')}</span>
          </button>
          <button
            onClick={() => setView('table')}
            className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${view === 'table'
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg transform scale-105'
              : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
          >
            <TableIcon size={16} className="mr-1.5" />
            <span className="font-medium">{t('table')}</span>
          </button>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {t('no_properties_available')}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {t('no_properties_yet') || "You haven't submitted any properties yet."}
          </p>
          <a
            href="/submit"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t('submit_property')}
          </a>
        </div>
      ) : (
        <>
          {view === 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {properties.map(prop => <PropertyCard key={prop.pid} property={prop} />)}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <PropertyTable data={properties} onExport={exportToExcel} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MyListings