// src/pages/Home.jsx
import { useState, useEffect, useContext } from 'react'
import PropertyCard from '../components/PropertyCard'
import PropertyTable from '../components/PropertyTable'
import AdvancedFilterForm from '../components/AdvancedFilterForm'
import { motion } from 'framer-motion'
import { GridIcon, TableIcon, SunIcon, MoonIcon, AlertCircleIcon } from 'lucide-react'
import * as XLSX from 'xlsx'
import ThemeContext from '../context/ThemeContext'
import LanguageContext from '../context/LanguageContext'
import usePropertyFilters from '../hooks/usePropertyFilters'

function Home() {
  const [view, setView] = useState('card')
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const { t } = useContext(LanguageContext)
  const { properties, loading, error, filtered, fetchProperties, resetFilters, clearError } = usePropertyFilters()

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Properties')
    XLSX.writeFile(wb, 'properties.xlsx')
  }

  return (
    // Main container with proper margins
    <div className="w-full bg-navy text-navy dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 md:mb-8 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-indigo-700 dark:text-gold-400 mb-2">
            {t('welcome_to_addis_home')}
          </h1>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-400">
            {t('discover_premium_properties')}
          </p>
        </div>
      </motion.div>

      {/* Filter form */}
      <AdvancedFilterForm onFilter={fetchProperties} onReset={resetFilters} />

      {/* Desktop View toggle */}
      <div className="hidden md:flex justify-end mb-6 px-4">
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

      {/* Mobile View toggle - Top right corner */}
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

      {/* Error Message */}
      {error && (
        <div className="mx-4 mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <AlertCircleIcon size={20} className="mr-2" />
          <span>{error}</span>
          <button
            onClick={clearError}
            className="ml-auto text-red-500 hover:text-red-700 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading_properties')}</p>
        </div>
      )}

      {/* Properties */}
      {!loading && (
        <>
          {view === 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
              {properties.map(prop => <PropertyCard key={prop.pid} property={prop} />)}
            </div>
          ) : (
            <div className="px-2 md:px-4 overflow-x-auto">
              <PropertyTable data={properties} onExport={exportToExcel} />
            </div>
          )}

          {properties.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {filtered ? t('no_properties_match_filters') : t('no_properties_available')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {filtered ? t('try_adjusting_search_criteria') : t('check_back_later')}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home