// src/pages/Home.jsx
import { useState, useEffect, useContext } from 'react'
import api from '../api'
import PropertyCard from '../components/PropertyCard'
import PropertyTable from '../components/PropertyTable'
import FilterForm from '../components/FilterForm'
import { motion } from 'framer-motion'
import { GridIcon, TableIcon, SunIcon, MoonIcon } from 'lucide-react'
import * as XLSX from 'xlsx'
import ThemeContext from '../context/ThemeContext'

function Home() {
  const [properties, setProperties] = useState([])
  const [view, setView] = useState('card')
  const [filtered, setFiltered] = useState(false)
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString()
    const res = await api.get(`/properties?${params}`)
    setProperties(res.data || [])
    setFiltered(Object.keys(filters).length > 0)
  }

  const handleReset = () => {
    fetchProperties()
  }

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Properties')
    XLSX.writeFile(wb, 'properties.xlsx')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}

      <div className="p-4 bg-white dark:bg-black text-black dark:text-white">
        Toggle me!
      </div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 flex justify-between items-center px-4"
      >
        <div>
          <h1 className="text-4xl font-bold text-indigo-900 dark:text-gold-400">
            Welcome to Real Estate Ethiopia
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover premium properties in Ethiopia
          </p>
        </div>
        
        {/* Dark/Light Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
        >
          {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>
      </motion.div>

      {/* Filter form */}
      <FilterForm onFilter={fetchProperties} onReset={handleReset} />

      {/* View toggle */}
      <div className="flex justify-end mb-4 px-4">
        <button 
          onClick={() => setView('card')} 
          className={`p-2 rounded ${view === 'card' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          <GridIcon size={20} />
        </button>
        <button 
          onClick={() => setView('table')} 
          className={`p-2 ml-2 rounded ${view === 'table' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          <TableIcon size={20} />
        </button>
      </div>

      {/* Properties */}
      {view === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {properties.map(prop => <PropertyCard key={prop.pid} property={prop} />)}
        </div>
      ) : (
        <div className="px-4">
          <PropertyTable data={properties} onExport={exportToExcel} />
        </div>
      )}

      {properties.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No properties found.
        </p>
      )}
    </div>
  )
}

export default Home
