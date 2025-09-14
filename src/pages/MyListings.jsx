// src/pages/MyListings.jsx (Updated similarly with views)
import { useState, useEffect } from 'react'
import api from '../api'
import PropertyCard from '../components/PropertyCard'
import PropertyTable from '../components/PropertyTable'
import { GridIcon, TableIcon } from 'lucide-react'
import * as XLSX from 'xlsx'

function MyListings() {
  const [properties, setProperties] = useState([])
  const [view, setView] = useState('card')

  useEffect(() => {
    api.get('/properties/me').then(res => setProperties(res.data))
  }, [])

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'My Listings')
    XLSX.writeFile(wb, 'my_listings.xlsx')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-indigo-900 dark:text-gold-300">My Listings</h1>
      <div className="flex justify-end mb-4">
        <button onClick={() => setView('card')} className={`p-2 ${view === 'card' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
          <GridIcon size={20} />
        </button>
        <button onClick={() => setView('table')} className={`p-2 ml-2 ${view === 'table' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
          <TableIcon size={20} />
        </button>
      </div>
      {view === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map(prop => <PropertyCard key={prop.pid} property={prop} />)}
        </div>
      ) : (
        <PropertyTable data={properties} onExport={exportToExcel} />
      )}
    </div>
  )
}

export default MyListings