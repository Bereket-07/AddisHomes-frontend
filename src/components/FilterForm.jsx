import { useState, useContext } from 'react'
import { FilterIcon, RotateCcwIcon } from 'lucide-react'
import LanguageContext from '../context/LanguageContext'

function FilterForm({ onFilter, onReset }) {
  const { t } = useContext(LanguageContext)
  const [filters, setFilters] = useState({
    location_region: '',
    location_site: '',
    property_type: '',
    status: '',
    min_price: '',
    max_price: '',
    min_bedrooms: '',
    max_bedrooms: '',
    min_floor_level: '',
    is_commercial: '',
    has_elevator: '',
    has_private_rooftop: '',
    is_two_story_penthouse: '',
    has_private_entrance: '',
  })

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter(filters)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-theme-secondary p-6 rounded-2xl shadow-lg border border-theme mb-8 transition-colors duration-300"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl flex items-center text-theme-primary">
          <FilterIcon size={22} className="mr-2 text-blue-500" /> {t('filters')}
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center text-sm font-medium px-4 py-2 rounded-full border border-theme text-theme-secondary hover:text-theme-primary hover:bg-theme-muted transition-colors duration-200"
        >
          <RotateCcwIcon size={16} className="mr-2" /> {t('reset_filters')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-theme-secondary mb-1">Region</label>
          <select
            name="location_region"
            onChange={handleChange}
            className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">All Regions</option>
            <option value="Addis Ababa">Addis Ababa</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-theme-secondary mb-1">Site</label>
          <select
            name="location_site"
            onChange={handleChange}
            className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">All Places</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-theme-secondary mb-1">Property Type</label>
          <select
            name="property_type"
            onChange={handleChange}
            className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">All</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
            <option value="LAND">Land</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-theme-secondary mb-1">Status</label>
          <select
            name="status"
            onChange={handleChange}
            className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">All</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="SOLD">Sold</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-theme-secondary mb-1">Price Range</label>
          <select
            name="price_range"
            onChange={(e) => {
              const [min, max] = e.target.value.split('-')
              setFilters({ ...filters, min_price: min, max_price: max })
            }}
            className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">Any</option>
            <option value="0-1000000">Under 1M</option>
            <option value="1000000-3000000">1M – 3M</option>
            <option value="3000000-6000000">3M – 6M</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-theme-secondary mb-1">Bedrooms</label>
          <select
            name="bedrooms"
            onChange={(e) => {
              const [min, max] = e.target.value.split('-')
              setFilters({ ...filters, min_bedrooms: min, max_bedrooms: max })
            }}
            className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">Any</option>
            <option value="1-1">1 Bed</option>
            <option value="2-2">2 Beds</option>
            <option value="3-3">3 Beds</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
        {[
          { name: 'min_floor_level', label: 'Min Floor', options: [{ v: 1, l: '1+' }, { v: 5, l: '5+' }, { v: 10, l: '10+' }] },
          { name: 'is_commercial', label: 'Commercial', options: [{ v: true, l: 'Yes' }, { v: false, l: 'No' }] },
          { name: 'has_elevator', label: 'Elevator', options: [{ v: true, l: 'Yes' }, { v: false, l: 'No' }] },
          { name: 'has_private_rooftop', label: 'Rooftop', options: [{ v: true, l: 'Yes' }, { v: false, l: 'No' }] },
          { name: 'is_two_story_penthouse', label: 'Penthouse', options: [{ v: true, l: 'Yes' }, { v: false, l: 'No' }] },
          { name: 'has_private_entrance', label: 'Entrance', options: [{ v: true, l: 'Yes' }, { v: false, l: 'No' }] },
        ].map(f => (
          <div key={f.name} className="flex flex-col">
            <label className="text-sm text-theme-secondary mb-1">{f.label}</label>
            <select
              name={f.name}
              onChange={handleChange}
              className="rounded-lg border border-theme bg-theme-primary text-theme-primary p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">Any</option>
              {f.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {t('apply_filters')}
        </button>
      </div>
    </form>
  )
}

export default FilterForm